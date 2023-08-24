Ext.define('MyMobileApp.view.signature.SignatureView', {
  extend: 'Ext.Window',
  xtype: 'signatureview',
  requires: ['MyMobileApp.view.signature.SignaturePad'],
  width: 400,
  height: 300,
  layout: 'fit',
  hidden: false,
  modal: true,
  autoShow: true,
  title: 'Sign Terms and Conditions',

  items: [
    {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start',
      },
      items: [
        {
          html: 'By signing below you agree to approve to our Terms and Conditions',
          padding: 4,
        },
        {
          xtype: 'panel',
          border: 1,
          margin: 5,
          bodyStyle: 'border-style: dotted',
          layout: 'fit',
          flex: 1,
          items: [
            {
              xtype: 'signaturepad',
            },
          ],
        },
        {
          xtype: 'toolbar',
          docked: 'bottom',
          items: [
            { xtype: 'spacer', flex: 1 },
            {
              xtype: 'button',
              text: 'Clear',
              handler: function () {
                this.up('signatureview').down('signaturepad').clear();
              },
            },
            {
              xtype: 'button',
              text: 'Save',
              handler: function () {
                var signaturePad =
                  this.up('signatureview').down('signaturepad');
                var signature = signaturePad.toDataURL();
                signaturePad.clear();

                Ext.Ajax.request({
                  url: 'http://localhost:3000/signature',
                  method: 'POST',
                  params: {
                    signature: signature,
                  },
                  success: function (response) {
                    console.log(`success! \n signature: ${signature}`);
                  },
                  failure: function (response) {
                    console.log('failure...');
                  },
                });
                this.up('signatureview').close();
              },
            },
          ],
        },
      ],
    },
  ],
});
