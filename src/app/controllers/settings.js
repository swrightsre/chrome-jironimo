function SettingsController($scope) {
  // defining dynamic data
  angular.forEach(
    ['account', 'colors', 'timer', 'workspaces'], function (name) {
      $scope[name] = jironimoSettings[name];
    }
  );

  $scope.workspaceAdd = function () {
    if ($scope.workspaces.length > 10) {
      return false;
    }
    $scope.workspaces.push({title: null, query: null, default: false});
  };

  $scope.workspaceSetAsDefault = function (workspace) {
    angular.forEach($scope.workspaces, function(entry){
      if (entry.default) {
        entry.default = false;
      }
      entry.default = (entry === workspace);
    });
  };

  $scope.workspaceRemove = function (workspace) {
    if ($scope.workspaces.length < 2) {
      return false;
    }

    $scope.workspaces = _.filter($scope.workspaces, function (entry) {
      return entry !== workspace;
    });

    if (workspace.default) {
      $scope.workspaceSetAsDefault($scope.workspaces[0]);
    }
  };

  /**
   * Saves settings
   *
   * @param {String} type
   * @param {Object} data
   * @return {Boolean}
   */
  $scope.save = function (type, data) {
    if (!data) {
      return false;
    }

    // some normalization
    if (type === 'account') {
      data.url = data.url.replace(/\/$/, '');
    }

    jironimoSettings[type] = angular.copy(data);
    return true;
  };
}