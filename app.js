
Vue.component('calculadora' , {
    template : `<div class="container">
                    <div class="calculadora">
                        <h2 class="title">Calculadora Basica</h2>
                        <botones-calculadora />
                        <final />
                    </div>
                </div>`,
});


Vue.component('display-pantalla', {
    template : '<div class="pantalla"><div class="cTop">{{value}}</div></div>',
    props : ['value'],
});

Vue.component('botones-calculadora', {
    template: `
            <div>
                <display-pantalla :value= "this.display" />
                <div class="panel">
                  <div class="opcionBox cBox-na">&nbsp;</div>
                  <div class="opcionBox" @click="clear">C</div>
                  <div class="opcionBox" @click="del">DEL</div>
                  <div class="opcionBox" @click="enterOps(3)">X</div>
                </div>
                <div class="panel">
                  <div class="opcionBox" @click="enterNum(7)">7</div>
                  <div class="opcionBox" @click="enterNum(8)">8</div>
                  <div class="opcionBox" @click="enterNum(9)">9</div>
                  <div class="opcionBox" @click="enterOps(2)">-</div>
                </div>
                <div class="panel">
                  <div class="opcionBox" @click="enterNum(4)">4</div>
                  <div class="opcionBox" @click="enterNum(5)">5</div>
                  <div class="opcionBox" @click="enterNum(6)">6</div>
                  <div class="opcionBox" @click="enterOps(1)">+</div>
                </div>
                <div class="panel">
                  <div class="opcionBox" @click="enterNum(1)">1</div>
                  <div class="opcionBox" @click="enterNum(2)">2</div>
                  <div class="opcionBox" @click="enterNum(3)">3</div>
                  <div class="opcionBox" @click="enterOps(4)">÷</div>
                </div>
                <div class="panel">
                  <div class="opcionBox" @click="enterNum(0)">0</div>
                  <div class="opcionBox" @click="addDecimal">.</div>
                  <div class="opcionBox cBox-na">&nbsp;</div>
                  <div class="opcionBox" @click="sum">=</div>
                </div>
            </div>    
                `,
      data : function(){
        return {
          currentNum: 0,
          decimalAdded: false,
          total: 0,
          prevOps: 0,
          display: '0',
        }
    },

    methods : {
        clear : function(){
          this.currentNum = 0;
          this.decimalAdded = false;
          this.total = 0;
          this.display = '';
          this.prevOps = 0;
        },
        enterOps : function(val){
            if (this.total == 0 && this.currentNum == 0) {
              return;
            }
            if (this.total == 0) {
              this.total += this.currentNum;
            }
            switch (this.prevOps) {
              case 1:
                this.total += this.currentNum;
                break;
              case 2:
                this.total -= this.currentNum;
                break;
              case 3:
                this.total *= this.currentNum;
                break;
              case 4:
                this.total /= this.currentNum;
                break;
              case 0:
                break;
            }

            if (this.decimalAdded == true) {
              this.decimalAdded = false;
            }
            this.currentNum = 0;
            this.prevOps = val;
        },
        del: function(){
            if (this.currentNum > 0) {
              if (this.decimalAdded == false) {
                this.currentNum = parseInt(this.currentNum.toString().slice(0, -1), 10);
              } 
              else {
                this.currentNum = parseFloat(this.currentNum.toString().slice(0, -1));
              }

              if (isNaN(this.currentNum))
                this.currentNum = 0;
                this.display = this.currentNum;
            } 
            else if (this.currentNum == 0) {
              this.display = '';
            }
        },
        addDecimal: function(){
          if (this.decimalAdded == false) {
            if (this.prevOps != 0) {
              this.display = '0.';
            } 
            else {
              this.display += '.';
            }
            this.decimalAdded = true;
          }
        },
        sum : function(){
          switch (this.prevOps) {
            case 1:
              this.total += this.currentNum;
              break;
            case 2:
              this.total -= this.currentNum;
              break;
            case 3:
              this.total *= this.currentNum;
              break;
            case 4:
              this.total /= this.currentNum;
              break;
            case 0:
            break;
          }
          this.display = this.total.toString();
          this.prevOps = 0;
          this.currentNum = 0;
        },
        enterNum: function(val){
          if (this.currentNum == 0) {
            if (this.prevOps == 0)
              this.total = 0;

            if (this.decimalAdded == true) {
              this.currentNum = val / 10;
              this.display += val.toString();
            } 
            else {
              this.currentNum = val;
              this.display = val.toString();
            }
          } else {
            if (this.decimalAdded == true) {
              if (this.currentNum.toString().indexOf('.') == -1) {
                this.currentNum = parseFloat(this.currentNum.toString() + '.' + val.toString());
              } else {
                this.currentNum += val.toString();
                this.currentNum = parseFloat(this.currentNum);
              }
            } else {
              this.currentNum *= 10;
              this.currentNum += val;
            }
            this.display += val.toString();
          }
        }
    }
});

Vue.component('final', {
  template : `<footer>
                <div class="desarrollador">
                    <span>Nelson Rubio FullStack Developer</span>
                </div>
              </footer>`,
});

new Vue({
    el : '#app',
    template : '<calculadora/>'
})