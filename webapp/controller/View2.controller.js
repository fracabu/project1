sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/Router",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, Router, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.View2", {
        onInit: function () {
            // Creazione del modello per i dati JSON
            var oModel = new JSONModel("../model/projects.json");
            oModel.attachRequestCompleted(function () {
                console.log("Dati del modello:", oModel.getData());
            });
            this.getView().setModel(oModel, "projects");

            // Creazione del modello per la paginazione
            var oPaginationModel = new JSONModel({
                currentPage: 1,
                itemsPerPage: 5
            });
            this.getView().setModel(oPaginationModel, "pagination");
        },

        onGoBackPress: function () {
            window.history.go(-1);
        },

        onItemSelected: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("projects");
            if (oContext) {
                var oData = oContext.getObject();
                var oProductModel = this.getView().getModel("projects");
                oProductModel.setProperty("/selectedProduct", oData);
            } else {
                console.error("Contexto di binding non trovato");
            }
        },

        onAddProject: function () {
            // Apri finestra di dialogo per l'inserimento di un nuovo progetto
            var oDialog = new sap.m.Dialog({
                title: "Aggiungi Progetto",
                content: [
                    new sap.m.Label({ text: "Opportunity Number" }),
                    new sap.m.Input({ value: "{projects>/newProject/opportunityNumber}" }),
                    new sap.m.Label({ text: "Project Name" }),
                    new sap.m.Input({ value: "{projects>/newProject/projectName}" }),
                    new sap.m.Label({ text: "Project Number" }),
                    new sap.m.Input({ value: "{projects>/newProject/projectNumber}" }),
                    // Aggiungi gli altri campi del modello JSON qui
                    new sap.m.Label({ text: "File Type" }),
                    new sap.m.Input({ value: "{projects>/newProject/fileType}" }),
                    new sap.m.Label({ text: "Coordinator" }),
                    new sap.m.Input({ value: "{projects>/newProject/coordinator}" }),
                    new sap.m.Label({ text: "Sales Employee" }),
                    new sap.m.Input({ value: "{projects>/newProject/salesEmployee}" }),
                    new sap.m.Label({ text: "Company Code" }),
                    new sap.m.Input({ value: "{projects>/newProject/companyCode}" }),
                    new sap.m.Label({ text: "Plant" }),
                    new sap.m.Input({ value: "{projects>/newProject/plant}" })
                ],
                buttons: [
                    new sap.m.Button({
                        text: "Aggiungi",
                        press: function () {
                            // Recupera i dati dal modello e aggiungi il nuovo progetto alla lista
                            var oNewProjectData = this.getView().getModel("projects").getProperty("/newProject");
                            var oProjectsData = this.getView().getModel("projects").getProperty("/projects");
                            oProjectsData.push(oNewProjectData);
                            this.getView().getModel("projects").setProperty("/projects", oProjectsData);

                            // Chiudi la finestra di dialogo
                            oDialog.close();
                            oDialog.destroy();

                            // Messaggio di successo
                            sap.m.MessageToast.show("Progetto aggiunto con successo!");
                        }.bind(this)
                    }),
                    new sap.m.Button({
                        text: "Annulla",
                        press: function () {
                            // Chiudi la finestra di dialogo senza aggiungere il progetto
                            oDialog.close();
                            oDialog.destroy();
                        }
                    })
                ]
            });

            oDialog.open();
        }
    });
});
