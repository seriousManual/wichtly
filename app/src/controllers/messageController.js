function messageController($scope, messageService) {
    $scope.messages = messageService.data();
}

module.exports = messageController;