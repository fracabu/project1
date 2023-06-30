sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/Router",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/type/Currency"
], function (Controller, MessageToast, Router, JSONModel, CurrencyType) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            // Creazione del modello dei dati JSON
            var oModel = new JSONModel("../model/data.json");
            oModel.attachRequestCompleted(function () {
                console.log("Model Data:", oModel.getData());
            });
            this.getView().setModel(oModel, "data");
            // Inizializzazione dell'istanza del Dialog di filtro a null
            this._oFilterDialog = null;
        },

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
                color: sNewProductColor,
                currency: "EUR" // Imposta la valuta desiderata
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
        },


        onUpdateProduct: function () {
            var oModel = this.getView().getModel("data");
            var oSelectedProduct = oModel.getProperty("/selectedProduct");
            if (oSelectedProduct) {
                // Effettua l'aggiornamento dei dati
                MessageToast.show("Prodotto aggiornato");
            } else {
                MessageToast.show("Seleziona un prodotto da modificare");
            }
        },

        onDeleteProduct: function () {
            var oModel = this.getView().getModel("data");
            var oSelectedProduct = oModel.getProperty("/selectedProduct");
            if (oSelectedProduct) {
                var aProducts = oModel.getProperty("/data");
                var nIndex = aProducts.indexOf(oSelectedProduct);
                if (nIndex !== -1) {
                    aProducts.splice(nIndex, 1);
                    oModel.setProperty("/data", aProducts);
                    oModel.setProperty("/selectedProduct", null); // Deseleziona il prodotto
                    MessageToast.show("Prodotto eliminato");
                }
            } else {
                MessageToast.show("Seleziona un prodotto da eliminare");
            }
        },

        onSaveProduct: function () {
            var oModel = this.getView().getModel("data");
            var oSelectedProduct = oModel.getProperty("/selectedProduct");
            if (oSelectedProduct) {
                // Effettua il salvataggio delle modifiche
                MessageToast.show("Modifiche salvate");
            } else {
                MessageToast.show("Non ci sono modifiche da salvare");
            }
        },

        onSearchProduct: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oModel = this.getView().getModel("data");
            var aProducts = oModel.getProperty("/data");
            var aFilteredProducts = aProducts.filter(function (oProduct) {
                // Effettua la ricerca nel campo 'name' del prodotto solo se è definito
                if (oProduct.name && sQuery) {
                    return oProduct.name.toLowerCase().includes(sQuery.toLowerCase());
                } else {
                    return false;
                }
            });
            oModel.setProperty("/searchResults", aFilteredProducts);
        },

        onSearchItemSelected: function (oEvent) {
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
        onSortProducts: function () {
            var oModel = this.getView().getModel("data");
            var aProducts = oModel.getProperty("/data");

            // Ordinamento dei prodotti per nome (in ordine alfabetico)
            aProducts.sort(function (a, b) {
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            // Aggiornamento del modello con la nuova sequenza dei prodotti
            oModel.setProperty("/data", aProducts);

            MessageToast.show("Prodotti ordinati per nome");
        },
        formatPrice: function (value, currency) {
            var oCurrencyType = new sap.ui.model.type.Currency();
            return oCurrencyType.formatValue([value, currency], "string");
        },



    });
});
