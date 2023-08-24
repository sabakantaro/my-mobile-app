// Ext.define('MyMobileApp.view.signature.PersonnelView', {
//   extend: 'Ext.Window',
//   xtype: 'personnelview',
//   requires: ['MyMobileApp.view.signature.SignaturePad'],
//   width: 400,
//   height: 300,
//   layout: 'fit',
//   modal: true,
//   autoShow: true,
//   title: 'Sign Terms and Conditions',

//   items: [
//     {
//       xtype: 'container',
//       layout: {
//         type: 'vbox',
//         align: 'stretch',
//         pack: 'start',
//       },
//       items: [
//         {
//           html: '<b>By signing below you agree to approve to our Terms and Conditions</b',
//           padding: 4,
//         },
//         {
//           xtype: 'panel',
//           border: 1,
//           margin: 5,
//           bodyStyle: 'border-style: dotted',
//           layout: 'fit',
//           flex: 1,
//           items: [
//             {
//               xtype: 'signaturepad',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });

// Show test view
Ext.define('MyMobileApp.view.personnel.PersonnelView', {
  extend: 'Ext.Container',
  xtype: 'personnelview',

  requires: ['Ext.layout.Fit'],

  layout: 'fit',

  items: [
    {
      xtype: 'navview',
      reference: 'navview',
      docked: 'left',
      bind: { width: '{navview_width}' },
      listeners: { select: 'onMenuViewSelectionChange' },
    },
    {
      xtype: 'headerview',
      reference: 'headerview',
      docked: 'top',
      bind: { height: '{headerview_height}' },
    },
    {
      xtype: 'footerview',
      reference: 'footerview',
      docked: 'bottom',
      bind: { height: '{footerview_height}' },
    },
    { xtype: 'centerview', reference: 'centerview' },
    {
      xtype: 'detailview',
      reference: 'detailview',
      docked: 'right',
      bind: { width: '{detailview_width}' },
    },
  ],
});
