window.onload = function(){
    /*画面の最大*/
    const MAX_WIDTH = 360;
    const MAX_HEIGHT = 640;


    Vue.component('navbar-header', {
        template: `
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">LOGO</a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span></a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span></a></li>
                </ul>
            </div>
        </div>
    </nav>
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

    const Transmit = { template: `
<div>
    <p>ここにコンテンツがはいります</p>

    <!-- button -->
    <div class="buttonzone">
      <router-link to="/train"><img src="image/stop.png" alt="stop" class="sbutton"></router-link>
    </div>
</div>
    ` };

    const Index = { template: `
     <section class="choice">
        <div class="post">
            <router-link to="/transmit"><img src="image/post.png" alt="post" class="button01"></router-link>
        </div>
        <div class="getpost">
            <router-link to="/train"><img src="image/getpost.png" alt="getpost" class="button02"></router-link>
        </div>
    </section>
    
    `};

    const Choice = { template: `
    <div>
        <p>ここにコンテンツがはいります</p>

        <!-- button -->
        <div class="buttonzone">
            <router-link to="/train"><img src="image/transmit.png" alt="stop" class="sbutton"></router-link>
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
