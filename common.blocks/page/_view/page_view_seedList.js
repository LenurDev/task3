/**
 * Created by lenur on 9/19/16.
 */

block('page').mod('view', 'seedList').content()(function () {
    var seeds = this.data.seeds;

    return seeds.map(function (item) {
        return {
            block: 'seed-list-item',
            mods: item.current ? {item: 'current'} : {},
            seed: item
        };
    }, this);
});