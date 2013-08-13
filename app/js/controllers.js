function wishList($scope) {
    $scope.grouped = [
        {
            name:"foo",
            wishes:[
                {
                    headline:"headline1",
                    text:"longText is long"
                },
                {
                    headline:"headline2",
                    text:"lalalalalalala"
                },
                {
                    headline:"headline3",
                    text:"this is anouther text"
                }
            ]
        },
        {
            name:"bar",
            wishes:[
                {
                    headline:"wurstHeadline",
                    text:"wurstText"
                }
            ]
        }
    ];
}