Ext.define('MyMobileApp.view.webcam.WebcamView', {
  extend: 'Ext.Panel',
  xtype: 'webcamview',
  controller: 'webcamviewcontroller',
  scrollable: true,


  items: [
    {
      xtype: 'component',
      html: '<video id="video">Video stream not available.</video>',
      reference: 'video',
    },
    {
      xtype: 'button',
      text: 'Play video',
      handler: 'playvideo',
      reference: 'playbutton',
    },
    {
      xtype: 'button',
      text: 'Take photo',
      handler: 'takepicture',
      reference: 'startbutton',
    },
    {
      xtype: 'component',
      html: '<canvas id="canvas"></canvas>',
      reference: 'canvas',
    },
    {
      xtype: 'component',
      html: '<img id="photo" alt="The screen capture will appear in this box.">',
      reference: 'photo',
    },
  ],
});
