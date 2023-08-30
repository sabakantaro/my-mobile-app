Ext.define('MyMobileApp.view.BarcodeReaderViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.barcodereaderviewcontroller',
  streaming: false,
  config: {
    refs: {
      barcodeReaderView: 'BarcodeReaderView',
      barcodeInfo: '#barcodeInfo',
    },
  },

  init: function () {
    const videoDiv = this.lookupReference('video').el.dom;
    this.initQuagga(videoDiv);
  },

  initQuagga: function (videoDiv) {
    console.log('initQuagga');
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 900,
            height: 600,
            facingMode: 'environment',
          },
          target: videoDiv,
        },
        decoder: {
          readers: ['code_128_reader'],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const barcodeValue = data.codeResult.code;
      console.log(`Detected barcode: ${barcodeValue}`);
      this.getProductInfo(barcodeValue);
    });
  },

  getProductInfo: function (barcodeValue) {
    Ext.Ajax.request({
      url: 'https://my-mobile-app.onrender.com/products',
      method: 'GET',
      params: {
        barcode: barcodeValue,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      success: (response) => {
        const product = Ext.decode(response.responseText);
        if (product) {
          this.showProductInfoDialog(product);
        } else {
          console.log('Product not found');
        }
      },
      failure: (response) => {
        console.log(`An error occurred: ${response.responseText}`);
      },
    });
  },

  showProductInfoDialog: function (product) {
    const barcodeInfoHTML = `
    <section id="barcodeInfo" style="width: 100%;">
      <div class="sfView">
        <div class="row sub-header">
          <div class="cell text-white">Job Details</div>
        </div>
        <div class="row">
          <div class="cell">
            <div class="cell-item">Barcode:</div>
            <div class="cell-item">${product?.barcode}</div>
            <div class="cell-item">Booking No:</div>
            <div class="cell-item">${product?.bookingNo}</div>
            <div class="cell-item">Connote No:</div>
            <div class="cell-item">${product?.connoteNo}</div>
            <div class="cell-item">Date:</div>
            <div class="cell-item">${product?.jobDate}</div>
            <div class="cell-item">Service:</div>
            <div class="cell-item">${product?.service}</div>
          </div>
        </div>
        <div class="row sub-header">
          <div class="cell half text-white">Pickup</div>
          <div class="cell half text-white">Delivery</div>
        </div>
        <div class="row">
          <div class="cell half">
            <div class="cell-item">Company:</div>
            <div class="cell-item">${product?.pickup?.company}</div>
            <div class="cell-item">Name:</div>
            <div class="cell-item">${product?.pickup?.name}</div>
            <div class="cell-item">Contact No:</div>
            <div class="cell-item">${product?.pickup?.contatctNo}</div>
            <div class="cell-item">Address:</div>
            <div class="cell-item">${product?.pickup?.address}</div>
            <div class="cell-item">Email:</div>
            <div class="cell-item">${product?.pickup?.email}</div>
            <div class="cell-item">Pickup Date:</div>
            <div class="cell-item">${product?.pickup?.pickupDate}</div>
            <div class="cell-item">Additional Service:</div>
            <div class="cell-item">${product?.pickup?.additionalService}</div>
          </div>
          <div class="cell half">
            <div class="cell-item">Company:</div>
            <div class="cell-item">${product?.delivery?.company}</div>
            <div class="cell-item">Name:</div>
            <div class="cell-item">${product?.delivery?.name}</div>
            <div class="cell-item">Contact No:</div>
            <div class="cell-item">${product?.delivery?.contatctNo}</div>
            <div class="cell-item">Address:</div>
            <div class="cell-item">${product?.delivery?.address}</div>
            <div class="cell-item">Email:</div>
            <div class="cell-item">${product?.delivery?.email}</div>
            <div class="cell-item">Delivery Date:</div>
            <div class="cell-item">${product?.delivery?.deliveryDate}</div>
            <div class="cell-item">Attachment:</div>
            <div class="cell-item">${product?.delivery?.attachment}</div>
          </div>
        </div>
        <div class="row sub-header">
          <div class="cell text-white">Items</div>
        </div>
        <div class="row">
          <div class="cell">
          ${product?.items?.map(
            (item) => `
            <div class="cell-item">Reference:</div>
            <div class="cell-item">${item.reference}</div>
            <div class="cell-item">Description:</div>
            <div class="cell-item">${item.description}</div>
            <div class="cell-item">Length:</div>
            <div class="cell-item">${item.length}</div>
            <div class="cell-item">Width:</div>
            <div class="cell-item">${item.width}</div>
            <div class="cell-item">Height:</div>
            <div class="cell-item">${item.height}</div>
            <div class="cell-item">Weight:</div>
            <div class="cell-item">${item.weight}</div>
            <div class="cell-item">Qty:</div>
            <div class="cell-item">${item.qty}</div>
            `
          )}
        </div>
      </div>
      <div class="row sub-header">
        <div class="cell text-white">Delivery Details</div>
      </div>
      <div class="row">
        <div class="cell">
        <div class="cell-item">Delivery Date:</div>
        <div class="cell-item">${product?.deliveryDate}</div>
        <div class="cell-item">Reference:</div>
        <div class="cell-item">${product?.reference}</div>
        <div class="cell-item">Timeslot Delivery:</div>
        <div class="cell-item">${product?.timeslotDelivery}</div>
        <div class="cell-item">Notes:</div>
        <div class="cell-item">${product?.notes}</div>
      </div>
    </div>
    <style>
      .sfView {
        width: 100%;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
        font-size: 12px;
      }
      .row {
        display: flex;
        justify-content: space-between;
      }
      .cell {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
      }
      .cell.half {
        flex: 0.5;
      }
      .text-white {
        color: #fff;
        font-weight: bold;
      }
      .items-header {
        width: 100%;
      }
      .cell-item {
        flex-basis: calc(50% - 10px);
        padding: 5px;
      }
      .sub-header {
        background-color: #64b5f6;
      }
      </style>
    `;

    const barcodeInfo = this.lookupReference('barcodeInfo');
    barcodeInfo.setHtml(barcodeInfoHTML);
  },
});
