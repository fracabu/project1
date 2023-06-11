sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/Router",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectListItem"
], function (Controller, MessageToast, Router, JSONModel, ObjectListItem) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            // Creazione del modello dei dati JSON
            var oModel = new JSONModel("../model/data.json");
            oModel.attachRequestCompleted(function () {
                console.log("Model Data:", oModel.getData());
            });
            this.getView().setModel(oModel, "data");
        }
        ,
        showMessageOnClick: function () {
            var sMessage = "Questo è un messaggio di testo.";
            MessageToast.show(sMessage);
        },
        navToViewOnClick: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2");
        },
        onItemSelected: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("data");
            if (oContext) {
                var oData = oContext.getObject();
                var oProductModel = this.getView().getModel("data");
                oProductModel.setProperty("/selectedProduct", oData);
            } else {
                console.error("Binding Context not found");
            }
        },
        onAddProduct: function () {
            var sNewProductName = this.byId("newProductName").getValue();
            var sNewProductPrice = this.byId("newProductPrice").getValue();
            var sNewProductDescription = this.byId("newProductDescription").getValue();
            var sNewProductQuantity = this.byId("newProductQuantity").getValue();
            var sNewProductColor = this.byId("newProductColor").getValue();
        
            // Verifica se i campi obbligatori sono stati compilati
            if (!sNewProductName || !sNewProductPrice || !sNewProductDescription || !sNewProductQuantity || !sNewProductColor) {
                MessageToast.show("Compilare tutti i campi obbligatori");
                return;
            }
        
            var oModel = this.getView().getModel("data");
            var aProducts = oModel.getProperty("/data");
            var oNewProduct = {
                name: sNewProductName,
                price: sNewProductPrice,
                description: sNewProductDescription,
                quantity: sNewProductQuantity,
                color: sNewProductColor
            };
            aProducts.push(oNewProduct);
            oModel.setProperty("/data", aProducts);
        
            MessageToast.show("Nuovo prodotto aggiunto");
        
            // Reset dei valori degli input
            this.byId("newProductName").setValue("");
            this.byId("newProductPrice").setValue("");
            this.byId("newProductDescription").setValue("");
            this.byId("newProductQuantity").setValue("");
            this.byId("newProductColor").setValue("");
        }
        

        
        
        
    });
});
