sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/Router",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Router, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit: function () {
            // Creazione del modello dei dati JSON
        
        },

        navToViewOnClick: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2");
        },

        onGoBackPress: function () {
            window.history.go(-1);
        },
    });
});
