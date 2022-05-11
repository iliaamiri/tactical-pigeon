const Player = {
    playerId: null, // int (db primary key auto increment)
    username: null, // string 
    ammoInventory: null, //$ref: AmmoInventory

    life: null, // $ref: Life

    toJSON: function() {
        return {
            playerId: this.playerId,
            username: this.username,
            ammoInventory: this.ammoInventory,
            life: this.life,
        };
    },
};

module.exports = Player;