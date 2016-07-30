module.exports = {

    generateTestDungeon: function() {
        return {
            floors: [{x1: 0, y1: 0, x2: 10, y2: 100}, {x1: -30, y1: -40, x2: -70, y2: -80}],
            walls: [{x1: 0, y1: 0, x2: 0, y2: 10}, {x1: 0, y1: 0, x2: 10, y2: 0}]
        };
    }

};