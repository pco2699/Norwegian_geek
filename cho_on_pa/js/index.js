window.onload = function(){
    /*画面の最大*/
    const MAX_WIDTH = 360;
    const MAX_HEIGHT = 640;


    Vue.component('navbar-header', {
        template: `
    <header class="header">
      <p class="header-title">初回画面</p>
    </header>
        `
    });

    Vue.component('circle_org', {
        template: `
<div>
      <div class="wrap" v-bind:style="{top: top, left: left, width: width, height: height}">
        <div class="circ1" v-bind:style="{color: color}">
          <div class="circ2" v-bind:style="{color: color}">
              <div class="circ3" v-bind:style="{color: color}"></div>
          </div>
        </div>
      <div class="moj" v-bind:style="{color: color}">
          {{ message }}
      </div>
      </div>
</div>
       `,
        props: ['color', 'top', 'left', 'width', 'height', 'message']
    });

    let color_code = ['#52BFCD', '#FED849', '#E84351', '#C3D957', '#FFA017'];

    let receive_data = [
        {
            color: '#52BFCD',
            top: '120px',
            left: '210px',
            width: '150px',
            height: '150px',
            message: '東京'
        }
    ];

    function addNewData(message, data) {
        let add_data = {
            color: color_code[getRand(color_code.length - 1, 0)],
            top: getRand(MAX_HEIGHT, 20) + 'px',
            left: getRand(MAX_WIDTH, 10) + 'px',
            width: getRand(150, 100) + 'px',
            height: getRand(150, 100) + 'px',
            message: message
        };
        data.push(add_data);
        return data;
    }

    /*乱数を作る関数*/
    function getRand(max, min) {
        return Math.floor( Math.random() * (max + 1 - min) ) + min
    }

    const Train = { template: `
<div>
    <div v-for="item in items">
        <circle_org v-bind="item"></circle_org>
    </div>
    <button v-on:click="addNewData">Add</button>
</div>`,
    data: function () {
        return { items: receive_data};
    },
        methods: {
          addNewData: function() {
              receive_data = addNewData("東京", receive_data);
          }
        }
    };

    const Choice = { template: `
<div>
    <form style="margin-top:100px; margin-bottom:75px;">
      <div class="form-group">
        <label for="exampleFormControlSelect1">降りる駅</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="station">
              <option>秋葉原</option>
              <option>神田</option>
              <option>東京</option>
              <option>有楽町</option>
              <option>新橋</option>
            </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">私のヒント</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="hint"></textarea>
      </div>
    </form>
    <!-- button -->
    <div class="#">
        <router-link to="/train">
            <img src="image/transmit.png" alt="stop" class="tbutton" v-on:click="printFormData">
        </router-link>
    </div>
</div>
    `,
        data: function () {
            return {
                station: "",
                hint: ""
            }
        },
    methods: {
        printFormData: function () {
            console.log(this.station + this.hint)
        }
    }
    };

    const Index = { template: `
<div>
     <!-- ロゴの幅はlogozoneで調整してください -->
     <div class="logozone">
        <img src="image/logo.png" class="toplogo">
     </div>

     <div class="logozone-bottom">
        <router-link to="/transmit"><img src="image/post.png" alt="post" class="button01"></router-link>
        <router-link to="/train"><img src="image/getpost.png" alt="getpost" class="button02"></router-link>
     </div>

</div>
    `};

    const Transmit = { template: `
<div>
    <div class="transmit-content">
        <circle_org color="#FF426E" top="100px" left="105px" height="150px" width="150px" message=""></circle_org>
    </div>
    <div>   
        <!-- button -->
        <router-link to="/"><img src="image/stop.png" alt="stop" class="sbutton"></router-link>
    </div>
</div>
`
};

    const routes = [
        { path: '/', component: Index},
        { path: '/train', component: Train },
        { path: '/transmit', component: Transmit },
        { path: '/choice', component: Choice }
        
    ];
    const router = new VueRouter({
        routes // routes: routes の短縮表記
    });
    const app = new Vue({
        router
    }).$mount('#app');


};
