window.onload = function () {
    let send_continue_flag = false;
    let transmit;
    let receivers;

    let recv_station_arr = [
        {
            sonic: "ultrasonic_19000",
            station: "秋葉原",
        },
        {
            sonic: "ultrasonic_19200",
            station: "神田",
        },
        {
            sonic: "ultrasonic_19400",
            station: "東京",
        },
        {
            sonic: "ultrasonic_19600",
            station: "有楽町",
        },
        {
            sonic: "ultrasonic_19800",
            station: "新橋",
        }
    ];

    function onQuietReady() {
        let profilename = 'ultrasonic_19600';
        transmit = Quiet.transmitter({profile: profilename, onFinish: onTransmitFinish});

    };

    function onReceive(recvPayload, recvObj) {
            var rcvStr = Quiet.ab2str(recvObj.content);

            var rcvData = rcvStr.split(",", 3);
            recvObj.id = rcvData[0];
            console.log("id:" + rcvData[0]);

            recvObj.station.textContent = rcvData[1];
            console.log("station:" + rcvData[1]);

            recvObj.hint.textContent = rcvData[2];
            console.log("hint:" + rcvData[2]);
    };


    function recvStart() {
        console.log("recvStart");
        recv_station_arr.forEach(function (item) {
            Quiet.receiver({
                profile: item.sonic,
                onReceive: function (payload) {
                    console.log("hogeeeee");
                    var station = item.station;
                    var rcvStr = Quiet.ab2str(payload);

                    var rcvData = rcvStr.split(",", 2);
                    var id = rcvData[0];
                    console.log("id:" + rcvData[0]);

                    var hint = rcvData[1];
                    console.log("hint:" + rcvData[1]);
                    addNewData(station, hint, receive_data);
                },
                onCreateFail: function () {
                    console.log("onCreateFail");
                },
                onReceiveFail: function () {
                    console.log("onRecieveFail");
                }
            });
        });
    };


    function sendStart(hint, station) {
        sendStop();
        let result = recv_station_arr.filter(function (item) {
            if (item.station === station) {
                return item;
            }
        });
        console.log(result[0]);
        let profilename = result[0].sonic;
        transmit = Quiet.transmitter({profile: profilename, onFinish: onTransmitFinish});

        var id = new Date().getTime().toString(16).substr(7, 10) + Math.floor(10 * Math.random()).toString(16);

        var payload = id + "," + hint + ".";
        send_continue_flag = true;
        transmitAction(payload);
    };

    function sendStop() {
        send_continue_flag = false;
    }

    function transmitAction(payload) {
        var send_continue = function () {
            console.log("transmit_now");
            transmit.transmit(Quiet.str2ab(payload));
            if (send_continue_flag == false) {
                return;
            }
            setTimeout(send_continue, 2000);
        };
        send_continue();
    }

    function onTransmitFinish() {
    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
    };

    /*画面の最大*/
    const MAX_WIDTH = 360;
    const MAX_HEIGHT = 640;


    Vue.component('navbar-header', {
        template: `
    <header class="header">
        <img src="image/headerlogo.png" class="header-logo">
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
          {{ message }}<br>{{ hint }}
      </div>
      </div>
</div>
       `,
        props: ['color', 'top', 'left', 'width', 'height', 'message', 'hint']
    });

    let color_code = ['#52BFCD', '#FED849', '#E84351', '#C3D957', '#FFA017'];

    let receive_data = [];

    function addNewData(message, hint, data) {
        let add_data = {
            color: color_code[getRand(color_code.length - 1, 0)],
            top: getRand(400, 57) + 'px',
            left: getRand(210, 0) + 'px',
            width: getRand(150, 100) + 'px',
            height: getRand(150, 100) + 'px',
            message: message,
            hint: hint
        };
        data.push(add_data);
        return data;
    }

    /*乱数を作る関数*/
    function getRand(max, min) {
        return Math.floor(Math.random() * (max + 1 - min)) + min
    }

    const Train = {
        template: `
<div>
    <div v-for="item in items">
        <circle_org v-bind="item"></circle_org>
    </div>
    <button v-on:click="addNewData">Add</button>
</div>`,
        data: function () {
            return {items: receive_data};
        },
        methods: {
            addNewData: function () {
                receive_data = addNewData("東京", "赤い傘", receive_data);
            }
        }
    };

    const Choice = {
        template: `
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
        <router-link to="/transmit">
            <img src="image/transmit.png" alt="stop" class="tbutton" v-on:click="sendStart">
        </router-link>
    </div>
    <script
</div>
    `,
        data: function () {
            return {
                station: "",
                hint: ""
            }
        },
        methods: {
            sendStart: function () {
                sendStart(this.hint, this.station);
            }
        }
    };

    const Index = {
        template: `
<div>
     <!-- ロゴの幅はlogozoneで調整してください -->
     <div class="logozone">
        <img src="image/logo.png" class="toplogo">
     </div>

     <div class="logozone-bottom">
        <router-link to="/choice"><img src="image/post.png" alt="post" class="button01"></router-link>
        <router-link to="/train"><img src="image/getpost.png" alt="getpost" class="button02" v-on:click="recvStart"></router-link>
     </div>

</div>
    `,
        methods: {
            recvStart: function () {
                recvStart()
            }
        }
    };

    const Transmit = {
        template: `
<div>
    <div class="transmit-content">
        <circle_org color="#FF426E" top="100px" left="105px" height="150px" width="150px" message=""></circle_org>
    </div>
    <div>
        <!-- button -->
        <router-link to="/"><img src="image/stop.png" alt="stop" class="sbutton" v-on:click="sendStop"></router-link>
    </div>
</div>
`,
        methods: {
            sendStop: function () {
                sendStop();
            }
        }
    };

    const routes = [
        {path: '/', component: Index},
        {path: '/train', component: Train},
        {path: '/transmit', component: Transmit},
        {path: '/choice', component: Choice}

    ];
    const router = new VueRouter({
        routes // routes: routes の短縮表記
    });
    const app = new Vue({
        router
    }).$mount('#app');

    Quiet.addReadyCallback(onQuietReady, onQuietFail);

    /*Quiet.jsの初期化*/
    Quiet.init({
        profilesPrefix: "/Norwegian_geek/cho_on_pa/js/",
        memoryInitializerPrefix: "/Norwegian_geek/cho_on_pa/js/",
        libfecPrefix: "/Norwegian_geek/cho_on_pa/js/"
    });

};
