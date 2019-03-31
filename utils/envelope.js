class Envelope {
    constructor(successful, payload, meta = null) {
      if (typeof successful !== 'boolean') {
        throw new Error(`Invalid type for parameter 'succesful', ${typeof successful}`);
      }
  
      this.successful = successful;
      this.payload = typeof payload !== 'undefined' ? payload : {};
      if(meta){
        this.meta = Object.assign({}, {t: new Date().getTime()}, meta)
      }
    }
  
    append(payload) {
      Object.assign(this.payload, payload);
    }
  
    toJSON() {
      return {
        successful: this.successful,
        payload: this.payload,
        meta: this.meta
      };
    }
  }
  
module.exports = Envelope;