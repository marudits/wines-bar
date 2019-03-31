<template lang="pug">
    .wine-list
        el-row(:gutter="8")
            el-col(:span="14")
                el-input(placeholder="Filter wines" v-model="filter")
                el-tree.filter-tree(
                    v-if="wines.list && wines.list.length > 0"
                    :data="wines.list" v-model="wines.selected" :props="wines.props" 
                    ref="wineList" show-checkbox
                    @check-change="handleChange"
                    :filter-node-method="filterList"
                    node-key="id"
                    )
                h4 There is no available wine(s) at the moment.
            el-col(:span="10")
                el-card.box-card.order
                    div(slot="header").clearfix.order-title
                        h2 Your Order
                    div.order-list
                        div(v-if="wines.selected.length > 0" v-for="selected of wines.selected").order-list__item
                            h4 {{ selected.name }} 
                                em {{ selected.price}}
                            p {{ selected.label }}
                        div(v-if="wines.selected.length === 0")
                            h4 No Order(s)
                    div.order-summary(v-if="wines.selected.length > 0")
                        el-row(type="flex")
                            el-col
                                h4 Total
                            el-col.order-summary__price
                                h4 &nbsp;$ {{ order.total }}
                        el-row
                            el-col(align="right")
                                el-button(type="success" @click="processOrder") Checkout
        
</template>

<script>

// service
import { wineService } from '../services/wine';

// utils
import { getWineName, getWinePrice } from '../utils/string-formatter';

export default {
    name: 'WineList',
    mounted(){
        this.loadList();
    },
    data: () => {
        return {
            filter: null,
            order: {
                total: 0
            },
            wines: {
                list: [],
                selected: [],
                props: {
                    children: '',
                    label: 'label',
                    disabled: 'disabled'
                },
            },
        }
    },
    methods: {
        filterList(value, data){            
            if (!value) {
                return true
            }
            return data.label.indexOf(value.toUpperCase()) !== -1;
        },
        handleChange(data, checked){
            if(checked){
                this.wines.selected.push(data);
                this.order.total += parseInt(data.price.replace('$', ''));
            } else {
                this.wines.selected.splice(this.wines.selected.findIndex(x => x.guid === data.guid), 1);
                this.order.total -= parseInt(data.price.replace('$', ''));
            }
        },
        loadList(){
            wineService.getWineList()
                .then(res => {
                    if(res.body.successful){
                        this.wines.list = res.body.payload.map(x => 
                            Object.assign({}, x, {
                                id: x.guid.split('/')[x.guid.split('/').length - 1],
                                label: `${getWineName(x.title)} - ${getWinePrice(x.title)}`,
                                price: getWinePrice(x.title),
                                name: getWineName(x.title),
                                disabled: !x.isAvailableToday
                            })
                        )
                        .sort((a,b) => a.title.localeCompare(b.title));
                    }
                })
                .catch(() => {
                     this.showMessage('Failed on get wine list.', 'error');
                })
        },
        processOrder(){
            let payload = this.wines.selected.map(x => x.id).join(',')
            
            wineService.orderWines(payload)
                .then(res => {
                    if(res.body.successful){
                        let unavailableOrders = res.body.payload.filter(x => !x.isAvailableToday);

                        if(unavailableOrders.length === 0){
                            this.showMessage(`Success on processing your orders. Please wait for your menu to be served. Thank you.`, 'success');
                            this.wines.selected = [];
                            this.$refs.wineList.setCheckedNodes(this.wines.selected);
                        } else {
                            let unavailableWines = unavailableOrders.map(x => getWineName(x.title)).join(', ');
                            this.showMessage(`Unfortunately ${unavailableWines} not available today. Please choose another wine(s).`, 'warning');
                        }

                    } else {
                        this.showMessage('Failed on process order. Please try again after a moment.', 'error');
                    }
                })
                .catch(() => {
                    this.showMessage('Failed on process order. Please try again after a moment.', 'error');
                })
        },
        showMessage(message = 'Lorem ipsum dolor sit amet', type = 'message',){
            this.$message({ type, message })
        },
    },
    watch: {
        filter(val) {
            this.$refs.wineList.filter(val);
        }
    },
}
</script>


<style lang="scss">
    .wine-list {
        .order {
            &-title {
                margin: 0;

                h2 {
                    margin: 0;
                }
            }

            &-list {
                &__item {
                    margin-bottom: .75rem;
                    h4 {
                        margin: 0;
                    }

                    p {
                        margin: 0;
                        font-size: .85em;
                    }
                }
            }

            &-summary {
                border-top: 1px solid lightgray;
                text-align: left;

                h4 {
                    margin: .5rem 0;
                }

                &__price {
                    text-align: right;
                }
            }
        }
    }
</style>
