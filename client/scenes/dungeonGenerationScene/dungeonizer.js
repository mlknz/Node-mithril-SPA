"use strict";
var Delaunay = require('./delaunay.js');

function isCollided(a, b) {
    if (a.x - a.w / 2 < b.x + b.w / 2 && a.x + a.w / 2 > b.x - b.w / 2 &&
        a.y + a.h / 2 > b.y - b.h / 2 && a.y - a.h / 2 < b.y + b.h / 2 ) return true;

    return false;
}

function dSq(a, b) {
    return (a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]);
}

function diveSearch(v, b, gVerts, visited) {
    visited.push(v);
    var wasThere = false;
    var found = false;

    for (var i = 0; i < gVerts[v].length; i++) {
        for (var k = 0; k < visited.length; k++) {
            if (gVerts[v][i] === b) {
                found = true;
                break;
            }
            if (visited[k] === gVerts[v][i]) {
                wasThere = true;
                break;
            }
        }

        if (!wasThere && !found) found = found || diveSearch(gVerts[v][i], b, gVerts, visited);
    }
    return found;
}

function hasTwoConnections(a, b, gVerts) {
    var visited = [a];
    var found = false;
    for (var j = 0; j < gVerts[a].length; j++) {
        if (gVerts[a][j] !== b) {
            found = found || diveSearch(gVerts[a][j], b, gVerts, visited);
        }
    }
    return found;
}

function generateDungeon() {
    var seed = 1;
    var dungeonSize = 13;
    var midRoomAspect = 1;
    var roomsAmount = dungeonSize * 5 + Math.floor(Math.random() * 10);

    var minSize = 4;
    var maxSize = 14;

    var rooms = [];
    var i, j, k, ii;

    // generate sizes
    var w, h, size;
    var sortedBySizeRoomIndices = [];
    for (i = 0; i < roomsAmount; i++) {
        w = minSize + Math.floor(Math.random() * (maxSize - minSize)); // todo: use nice distribution
        h = minSize + Math.floor(Math.random() * (maxSize - minSize)); // Math.floor(w * midRoomAspect * (Math.random() + 0.5));
        size = w * h;
        rooms.push({x: 0, y: 0, w: w, h: h, size: size, x1: -w / 2, x2: w / 2, y1: -h / 2, y2: h / 2, isMain: false});
    }
    var rooms1 = rooms.slice();

    // place rooms
    var maxR = roomsAmount * maxSize * 2;
    for (i = 1; i < roomsAmount; i++) {
        var roomAngle = Math.random() * 2 * Math.PI;

        var posX = 0;
        var posY = 0;
        var dirX = Math.cos(roomAngle);
        var dirY = Math.sin(roomAngle);

        for (k = 0; k < maxR; k++) {

            posX += dirX;
            posY += dirY;

            rooms[i].x = posX;
            rooms[i].y = posY;

            var collidedByAny = false;
            for (j = 0; j < i; j++) {
                if (isCollided(rooms[j], rooms[i])) {
                    collidedByAny = true;
                    break;
                }
            }


            if (!collidedByAny) {
                // make a round trying to place closer to center
                var d = Math.sqrt(posX*posX + posY*posY);
                var curAngle = roomAngle;
                var curPosX, curPosY;

                while(curAngle - roomAngle < Math.PI * 2) {
                    curAngle += 1 / d;

                    for (ii = d; ii > 0; ii--) {
                        curPosX = ii * Math.cos(curAngle);
                        curPosY = ii * Math.sin(curAngle);
                        collidedByAny = false;
                        for (j = 0; j < i; j++) {
                            rooms[i].x = curPosX;
                            rooms[i].y = curPosY;
                            if (isCollided(rooms[j], rooms[i])) {
                                collidedByAny = true;
                                break;
                            }
                        }
                        if (!collidedByAny) {
                            d = ii;
                            posX = curPosX;
                            posY = curPosY;
                        }
                    }

                }

                rooms[i].x = posX;
                rooms[i].y = posY;
                break;
            }

        }

        rooms[i].x1 = -rooms[i].w/2 + rooms[i].x;
        rooms[i].x2 = rooms[i].w/2 + rooms[i].x;
        rooms[i].y1 = -rooms[i].h/2 + rooms[i].y;
        rooms[i].y2 = rooms[i].h/2 + rooms[i].y;
    }

    // choose main rooms
    var mainVerts = [];
    var threshold = 10.3; // todo: fix stacking main rooms
    for (i = 0; i < rooms.length; i++) {
        if (/*rooms[i].w > threshold && rooms[i].h > threshold*/ rooms[i].size > threshold * threshold) {
            rooms[i].isMain = true;
            mainVerts.push([rooms[i].x, rooms[i].y]);
        }
    }

    // /
    var delTriangles = Delaunay.triangulate(mainVerts);

    var triangulationLines = [];
    var edges = [];
    var gVerts = [];
    var ind0, ind1, ind2;
    var f01, f02, f12;
    for (i = 0; i < delTriangles.length - 1; i += 3) {
        ind0 = delTriangles[i];
        ind1 = delTriangles[i + 1];
        ind2 = delTriangles[i + 2];

        triangulationLines.push(
            mainVerts[ind0][0], mainVerts[ind0][1], mainVerts[ind1][0], mainVerts[ind1][1],
            mainVerts[ind0][0], mainVerts[ind0][1], mainVerts[ind2][0], mainVerts[ind2][1],
            mainVerts[ind1][0], mainVerts[ind1][1], mainVerts[ind2][0], mainVerts[ind2][1]
        );

        if (!gVerts[ind0]) gVerts[ind0] = [];
        if (!gVerts[ind1]) gVerts[ind1] = [];
        if (!gVerts[ind2]) gVerts[ind2] = [];

        f01 = false;
        f02 = false;
        for (j = 0; j < gVerts[ind0].length; j++) {
            if (gVerts[ind0][j] === ind1) f01 = true;
            if (gVerts[ind0][j] === ind2) f02 = true;
        }
        for (j = 0; j < gVerts[ind1].length; j++) {
            if (gVerts[ind1][j] === ind2) f12 = true;
        }

        if (!f01) {
            gVerts[ind0].push(ind1);
            gVerts[ind1].push(ind0);
            edges.push({a: ind0, b: ind1, dSq: dSq(mainVerts[ind0], mainVerts[ind1])});
        }

        if (!f02) {
            gVerts[ind0].push(ind2);
            gVerts[ind2].push(ind0);
            edges.push({a: ind0, b: ind2, dSq: dSq(mainVerts[ind0], mainVerts[ind2])});
        }

        if (!f12) {
            gVerts[ind1].push(ind2);
            gVerts[ind2].push(ind1);
            edges.push({a: ind1, b: ind2, dSq: dSq(mainVerts[ind1], mainVerts[ind2])});
        }


    }

    // console.log(triangulationLines);

    // form minimum spanning tree (+extra leftAlive edges)
    edges.sort(function(a, b) {
        return a.dSq - b.dSq;
    });

    var hasSecondConnection;
    var a, b, tPos;
    var leaveEdgeAliveOneFrom = 9;
    var leavingAlive = 0;
    var leftAlive = [];
    for (i = edges.length - 1; i >= 0 ; i--) {
        hasSecondConnection = false;
        a = edges[i].a;
        b = edges[i].b;

        hasSecondConnection = hasTwoConnections(a, b, gVerts);
        if (hasSecondConnection) {
            if (leavingAlive > 0) {
                console.log('leaving alive');
                leftAlive.push({a: a, b: b});
            }
            tPos = gVerts[a].indexOf(b);
            gVerts[a].splice(tPos, 1);
            tPos = gVerts[b].indexOf(a);
            gVerts[b].splice(tPos, 1);
            edges.splice(i, 1);

            leavingAlive--;
            if (leavingAlive < -leaveEdgeAliveOneFrom + 2) leavingAlive = 1;
        }
    }

    var mstLines = [];
    for (i = 0; i < edges.length; i++) {
        mstLines.push(mainVerts[edges[i].a][0], mainVerts[edges[i].a][1], mainVerts[edges[i].b][0], mainVerts[edges[i].b][1]);
    }
    var leftAliveLines = [];
    for (i = 0; i < leftAlive.length; i++) {
        leftAliveLines.push(mainVerts[leftAlive[i].a][0], mainVerts[leftAlive[i].a][1], mainVerts[leftAlive[i].b][0], mainVerts[leftAlive[i].b][1]);
    }

    return {floors: rooms, fullDelaunayTriangles: triangulationLines, triangles: mstLines, leftAliveLines: leftAliveLines};
}

module.exports = {
    generateDungeon: generateDungeon
};