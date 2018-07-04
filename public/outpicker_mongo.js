/**
 * Created by weisong on 7/1/18.
 */

// Find list count of heroes picked
var pipeline = [
    {
        $group: {
            _id: {
                heroid: '$heroid',
                matchid: '$matchid'
            },
            count: {$sum: 1}
        },
        $group: {
            _id: {
                heroid: '$heroid',
            },
            count: {$sum: 1}
        }
    }, {
        $sort: {count: -1}
    },
];


// Duplicated games
var pipeline = [
    {
        $group: {
            _id: {
                leagueid: '$leagueid',
                matchid: '$matchid'
            },
            count: {$sum: 1}
        },
        $group: {
            _id: {
                leagueid: '$leagueid',
            },
            count: {$first: '$count'},
        }

    }
];

//find duplicated matches
var pipeline = [
    {
        $group: {
            _id: {
                leagueid: '$leagueid',
                matchid: '$matchid'
            },
            count: {$sum: 1}
        }
    },
    {
        $sort: {count: -1}
    }
];

//find show unique league
var pipeline = [
    {
        $group: {
            _id: {
                leagueid: '$leagueid',
            },
            count: {$sum: 1}
        }
    },
    {
        $sort: {count: -1}
    }
];

5627, 5616, 5396, 5399, 5364, 9579, 5157, 5579, 5637, 5401, 5197, 5609, 5313, 5353, 5504, 5506, 5690, 5336, 5850, 8055
{
    "_id"
:
    {
        "leagueid"
    :
        5579
    }
,
    "count"
:
    2270
}
{
    "_id"
:
    {
        "leagueid"
    :
        5637
    }
,
    "count"
:
    2080
}
{
    "_id"
:
    {
        "leagueid"
    :
        5401
    }
,
    "count"
:
    2050
}
{
    "_id"
:
    {
        "leagueid"
    :
        5197
    }
,
    "count"
:
    1850
}
{
    "_id"
:
    {
        "leagueid"
    :
        5609
    }
,
    "count"
:
    1760
}
{
    "_id"
:
    {
        "leagueid"
    :
        5313
    }
,
    "count"
:
    1750
}
{
    "_id"
:
    {
        "leagueid"
    :
        5353
    }
,
    "count"
:
    1740
}
{
    "_id"
:
    {
        "leagueid"
    :
        5504
    }
,
    "count"
:
    1590
}
{
    "_id"
:
    {
        "leagueid"
    :
        5506
    }
,
    "count"
:
    1280
}
{
    "_id"
:
    {
        "leagueid"
    :
        5690
    }
,
    "count"
:
    1250
}
{
    "_id"
:
    {
        "leagueid"
    :
        5336
    }
,
    "count"
:
    1250
}
{
    "_id"
:
    {
        "leagueid"
    :
        5850
    }
,
    "count"
:
    1160
}
{
    "_id"
:
    {
        "leagueid"
    :
        5627
    }
,
    "count"
:
    1040
}
{
    "_id"
:
    {
        "leagueid"
    :
        5616
    }
,
    "count"
:
    1030
}
{
    "_id"
:
    {
        "leagueid"
    :
        5396
    }
,
    "count"
:
    720
}
{
    "_id"
:
    {
        "leagueid"
    :
        5399
    }
,
    "count"
:
    350
}
{
    "_id"
:
    {
        "leagueid"
    :
        5364
    }
,
    "count"
:
    340
}
{
    "_id"
:
    {
        "leagueid"
    :
        9579
    }
,
    "count"
:
    290
}
