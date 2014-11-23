var actionEnum = {
    Stupsen: { type: "0", name: "Stupsen", dmg : 1, dmg_reduce : 0, poison : [], neededLvl : 0, neededEvo: 0}, //Stock

    Schlagen: { type: "w", name: "Schlagen", dmg : 3, dmg_reduce : 0, poison : [], neededLvl : 3, neededEvo: 1}, //Schwert
    Blocken: { type: "h", name: "Blocken", dmg : 0, dmg_reduce : 2, poison : [], neededLvl : 3, neededEvo: 1}, //Griff mit Brett
    Pieksen: { type: "t", name: "Pieksen", dmg : 2, dmg_reduce : 1, poison : [2,2], neededLvl : 3, neededEvo: 1}, //Speer

    Schwingen: { type: "w", name: "Schwingen", dmg : 8, dmg_reduce : 1, poison : [], neededLvl : 6, neededEvo: 2}, //Langschwert
    Verteidigen: { type: "h", name: "Verteidigen", dmg : 0, dmg_reduce : 4, poison : [], neededLvl : 6, neededEvo: 2}, //Schild
    Hacken: { type: "t", name: "Hacken", dmg : 6, dmg_reduce : 2, poison : [3,3,3], neededLvl : 6, neededEvo: 2}, //Hellebarde

    Aufschlitzen: { type: "w", name: "Aufschlitzen", dmg : 15, dmg_reduce : 0, poison : [], neededLvl : 9, neededEvo: 3}, //Zweihaender
    Rammen: { type: "h", name: "Rammen", dmg : 5, dmg_reduce : 8, poison : [], neededLvl : 9, neededEvo: 3}, //Grossschild
    Aufgabeln: { type: "t", name: "Aufgabeln", dmg : 15, dmg_reduce : 1, poison : [4,4,4,4], neededLvl : 9, neededEvo: 3}, //Dreizack

    Aua: { type: "w", name: "Aua!", dmg : 29, dmg_reduce : 0, poison : [], neededLvl : 12, neededEvo: 4}, //GreatSword
    Pieks: { type: "h", name: "Pieks!", dmg : 16, dmg_reduce : 12, poison : [], neededLvl : 12, neededEvo: 4}, //Pieks Pieks
    Auapieks: { type: "t", name: "Auapieks!", dmg : 29, dmg_reduce : 1, poison : [4,8,16,32], neededLvl : 12, neededEvo: 4}, //Aua Pieks

    Hohoho: { type: "t", name: "Ho! Ho! Ho!", dmg : 42, dmg_reduce : 8, poison : [], neededLvl : 15, neededEvo: 5}, //Tannenbaum
};

function Action(entry) {
    this.name = entry.name;
    this.dmg = entry.dmg;
    this.dmg_reduce = entry.dmg_reduce;
    this.poison = entry.poison;
}

