(function(){
  /**
* SETUP
**/
var app = app || {};

/**
* MODELS
**/
app.Message = Backbone.Model.extend({  
  url:function(){
    return 'http://api.openweathermap.org/data/2.5/weather?q='+this.city+'&APPID=2ab10d1d7c261f5cb373916cc1cf107f';
  } ,
  city:'',
  defaults: {
    main: {
        temp: -1,
        humidity: -1
    },
    wind: {
        speed: -1
    }
  }
});

app.MessageView = Backbone.View.extend({
  el:'#app',
  initialize:function(){
      var city = this.$el.data('city');
      var self = this;
      this.model = new app.Message();
      this.model.city = city;
      this.model.set('city',city);
      this.template = _.template($("#weather-tmpl").html());

      this.model.fetch({
          success:function(model,resp,options){
            self.render();
          }
      });
  },
  render:function(){
       var temp = this.model.get('main').temp;
       var celsius = parseInt(temp - 273.15);
        this.model.set('celsius', celsius);

        var date = moment().format('LL');
        this.model.set('date', date);

        var html = this.template(this.model.attributes);
       
      this.$el.html(html);
  }

  });

$(document).ready(function(){
    app.view = new app.MessageView();
});


})();