sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/Log",
    "sap/base/util/UriParameters"
  ], function (MockServer, Log, UriParameters) {
    "use strict";
  
    return {
      init: function () {
        // create
        var oMockServer = new MockServer({
          rootUri: "/"
        });
  
        var oUriParameters = new UriParameters(window.location.href);
  
        // configure mock server with a delay
        MockServer.config({
          autoRespond: true,
          autoRespondAfter: oUriParameters.get("serverDelay") || 500
        });
  
        // simulate against the metadata and mock data
        var sPath = sap.ui.require.toUrl("project1/localService");
        oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");
  
        // start
        oMockServer.start();

        
  
        Log.info("Running the app with mock data");
      }
    };
  });
  