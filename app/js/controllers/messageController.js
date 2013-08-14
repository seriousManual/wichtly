function messageController($scope, messageService) {
    $scope.data = messageService.data();
}

module.exports = messageController;