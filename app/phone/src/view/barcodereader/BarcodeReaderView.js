Ext.define('MyMobileApp.view.barcodereader.BarcodeReaderView', {
  extend: 'Ext.Panel',
  xtype: 'barcodereaderview',
  controller: 'barcodereaderviewcontroller',
  scrollable: true,

  config: {
    items: [
      {
        xtype: 'component',
        html: '<video id="videoElement" width="414" height="300"></video>',
        reference: 'video',
      },
    ],
  },
});
