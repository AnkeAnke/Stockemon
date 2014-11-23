var actionEnum = {
    Stupsen: { type: "0", name: "Stupsen", dmg : 1, dmg_reduce : 0, poison : [], neededLvl : 0, neededEvo: 0}, //Stock

    Schlagen: { type: "w", name: "Schlagen", dmg : 3, dmg_reduce : 0, poison : [], neededLvl : 3, neededEvo: 1}, //Schwert
    Schwingen: { type: "w", name: "Schwingen", dmg : 8, dmg_reduce : 1, poison : [], neededLvl : 6, neededEvo: 2}, //Langschwert
    Aufschlitzen: { type: "w", name: "Aufschlitzen", dmg : 15, dmg_reduce : 0, poison : [], neededLvl : 9, neededEvo: 3}, //Zweihaender
    Aua: { type: "w", name: "Aua!", dmg : 27, dmg_reduce : 0, poison : [], neededLvl : 12, neededEvo: 4}, //GreatSword

    Blocken: { type: "h", name: "Blocken", dmg : 3, dmg_reduce : 0, poison : [], neededLvl : 3, neededEvo: 1}, //Griff mit Brett
    Verteidigen: { type: "h", name: "Verteidigen", dmg : 8, dmg_reduce : 1, poison : [], neededLvl : 6, neededEvo: 2}, //Schild
    Rammen: { type: "h", name: "Rammen", dmg : 15, dmg_reduce : 0, poison : [], neededLvl : 9, neededEvo: 3}, //Grossschild
    Pieks: { type: "h", name: "Pieks!", dmg : 27, dmg_reduce : 0, poison : [], neededLvl : 12, neededEvo: 4}, //Pieks Pieks

    Pieksen: { type: "t", name: "Pieksen", dmg : 2, dmg_reduce : 0, poison : [2,2], neededLvl : 3, neededEvo: 1}, //Speer
    Hacken: { type: "t", name: "Hacken", dmg : 6, dmg_reduce : 1, poison : [3,3,3], neededLvl : 6, neededEvo: 2}, //Hellebarde
    Aufgabeln: { type: "t", name: "Aufgabeln", dmg : 15, dmg_reduce : 0, poison : [], neededLvl : 9, neededEvo: 3}, //Dreizack
    Auapieks: { type: "t", name: "Auapieks!", dmg : 27, dmg_reduce : 0, poison : [], neededLvl : 12, neededEvo: 4}, //Aua Pieks

    Hohoho: { type: "t", name: "Ho! Ho! Ho!", dmg : 27, dmg_reduce : 8, poison : [], neededLvl : 15, neededEvo: 5}, //Tannenbaum
};

function Action(entry) {
    this.name = entry.name;
    this.dmg = entry.dmg;
    this.dmg_reduce = entry.dmg_reduce;
    this.poison = entry.poison;
}

