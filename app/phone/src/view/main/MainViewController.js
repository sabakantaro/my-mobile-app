Ext.define('MyMobileApp.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',

  requires: [
    'MyMobileApp.view.signature.SignatureView',
    'MyMobileApp.view.signature.SignaturePad',
    'MyMobileApp.view.webcam.WebcamView',
    'MyMobileApp.view.barcodereader.BarcodeReaderView',
  ],

  init: function (view) {
    this.redirectTo('barcodereaderview', true);
  },

  onMenuClick: function (button) {
    Ext.Viewport.toggleMenu('left');
    Ext.getCmp('theToolbar').setTitle(button.getText());
    this.redirectTo(button.tag);
  },

  routes: {
    ':xtype': { action: 'mainRoute' },
  },

  mainRoute: function (xtype) {
    var exists = Ext.ClassManager.getByAlias('widget.' + xtype);
    if (exists === undefined) {
      console.log(xtype + ' does not exist');
      return;
    }
    var centerview = Ext.getCmp('mainview');
    if (!centerview.getComponent(xtype)) {
      centerview.add({ xtype: xtype });
    }
    var component = centerview.getComponent(xtype);
    if (component) {
      centerview.setActiveItem(component);
    }
  },
});
