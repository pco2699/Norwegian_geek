window.onload = function(){
    Vue.component('navbar-header', {
        template: `
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">戻る</a>
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

    const Train = { template: `
    <div>
       <!-- station01 -->
    <div class="wrapper1">
      <div class="circle11">
          <div class="circle21">
              <div class="circle31"></div>
          </div>
      </div>
      <div class="moji1">
          東　京
      </div>
    </div>

    <!-- station02 -->
    <div class="wrapper2">
      <div class="circle12">
          <div class="circle22">
              <div class="circle32"></div>
          </div>
      </div>
      <div class="moji2">
          有楽町
      </div>
    </div>

    <!-- station03 -->
    <div class="wrapper3">
      <div class="circle13">
          <div class="circle23">
              <div class="circle33"></div>
          </div>
      </div>
      <div class="moji3">
          秋葉原
      </div>
    </div>

    <!-- station04 -->
    <div class="wrapper4">
      <div class="circle14">
          <div class="circle24">
              <div class="circle34"></div>
          </div>
      </div>
      <div class="moji4">
          御徒町
      </div>
    </div>
    </div>
` };

    const Transmit = { template: `
<div>
    <form style="margin-top:100px; margin-bottom:75px;">
      <div class="form-group">
        <label for="exampleFormControlSelect1">降りる駅</label>
            <select class="form-control" id="exampleFormControlSelect1">
              <option>秋葉原</option>
              <option>神田</option>
              <option>東京</option>
              <option>有楽町</option>
              <option>新橋</option>
            </select>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">私のヒント</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
      </div>
      <!--
      <button type="submit" class="btn btn-default">Submit</button>
      -->
    </form>
    <!-- button -->
    <div class="buttonzone">
      <router-link to="/train"><img src="image/transmit.png" alt="stop" class="sbutton"></router-link>
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
