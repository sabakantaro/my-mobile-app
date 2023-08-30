Ext.define('MyMobileApp.view.webcam.WebcamViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.webcamviewcontroller',

  width: 400,
  height: 0,
  streaming: false,

  init: function () {
    var me = this;
    var videoDiv = this.lookupReference('video').el.dom;
    var video = videoDiv.querySelector('video');
    var canvasDiv = this.lookupReference('canvas').el.dom;
    var canvas = canvasDiv.querySelector('canvas');

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: {
            exact: 'environment',
          },
        },
        // inner camera
        // video: true,
        audio: false,
      })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log('An error occurred: ' + err);
      });

    video.addEventListener(
      'canplay',
      function (ev) {
        if (!me.streaming) {
          me.height = video.videoHeight / (video.videoWidth / me.width);

          if (isNaN(me.height)) {
            me.height = me.width / (4 / 3);
          }

          video.setAttribute('width', me.width);
          video.setAttribute('height', me.height);
          canvas.setAttribute('width', me.width);
          canvas.setAttribute('height', me.height);
          me.streaming = true;
        }
      },
      false
    );

    me.lookupReference('startbutton').el.on(
      'click',
      function (ev) {
        me.takepicture();
        ev.preventDefault();
      },
      false
    );

    me.clearphoto();
  },

  clearphoto: function () {
    var canvasDiv = this.lookupReference('canvas').el.dom;
    var canvas = canvasDiv.querySelector('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    this.lookupReference('photo').el.dom.setAttribute('src', data);
  },

  takepicture: function () {
    var videoDiv = this.lookupReference('video').el.dom;
    var video = videoDiv.querySelector('video');
    var canvasDiv = this.lookupReference('canvas').el.dom;
    var canvas = canvasDiv.querySelector('canvas');
    var photoDiv = this.lookupReference('photo').el.dom;
    var photo = photoDiv.querySelector('img');
    var context = canvas.getContext('2d');

    if (this.width && this.height) {
      canvas.width = this.width;
      canvas.height = this.height;
      context.drawImage(video, 0, 0, this.width, this.height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      this.clearphoto();
    }
  },
});
