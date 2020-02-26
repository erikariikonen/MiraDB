var TABLES = {};

TABLES['Opiskelija'] = {
    schema: "opiskelijanumero integer, nimi text, syntymävuosi integer, pääaine text",
    data: [
	[999999, "Pihla", 1997, "Tietojenkäsittelytiede"],
	[999998, "Joni", 1993, "Tietojenkäsittelytiede"],
	[999997, "Anna", 1991, "Matematiikka"],
	[999996, "Krista", 1990, "Tietojenkäsittelytiede"],
	[999995, "Matti", 1970, "Matematiikka"],
	[999994, "Gandhi", 1869, "Oikeustiede"],
    ]
}

TABLES['Kurssisuoritus'] = {
    schema: "opiskelija integer, kurssi text, päivämäärä date, arvosana integer",
    data: [
	[999999, "Ohjelmoinnin perusteet", "2014-08-01", 5],
	[999999, "Ohjelmoinnin jatkokurssi", "2014-08-01", 5],
	[999999, "Tietokantojen perusteet", "2014-10-20", 3],
	[999998, "Ohjelmoinnin perusteet", "2013-08-01", 4]
    ]
}

var WK2TABLES = {};

WK2TABLES['Opiskelija'] = {
    schema: "opiskelijanumero integer, nimi text, syntymävuosi integer, pääaine text",
    data: [
	[999999, "Pihla", 1997, "Tietojenkäsittelytiede"],
	[999998, "Joni", 1993, "Tietojenkäsittelytiede"],
	[999997, "Anna", 1991, "Matematiikka"],
	[999996, "Krista", 1990, "Tietojenkäsittelytiede"],
	[999995, "Matti", 1970, "Matematiikka"],
	[999994, "Gandhi", 1869, "Oikeustiede"],
    ]    
};

WK2TABLES['Kurssi'] = {
    schema: "kurssitunnus integer, nimi text, kuvaus text",
    data: [
	[581325, "Ohjelmoinnin perusteet", "Kurssilla perehdytään nykyaikaisen ohjelmoinnin perusideoihin sekä algoritmien laatimiseen."],
	[582103, "Ohjelmoinnin jatkokurssi", "Kurssilla perehdytään olio-ohjelmoinnin perustekniikoihin."],
	[581328, "Tietokantojen perusteet", "Kurssilla tutustutaan tiedon esitysmuotoihin ja tiedon hakuun suurista tietomääristä."]
    ]
};

WK2TABLES['Kurssisuoritus'] = {
    schema: "opiskelija integer, kurssi integer, päivämäärä date, arvosana integer, opintopistemäärä integer",
    data: [
	[999999, 581325, "2014-08-01", 5, 5],
	[999999, 582103, "2014-08-01", 5, 5],
	[999999, 581328, "2014-10-20", 3, 5],
	[999998, 581325, "2013-08-01", 4, 5]
    ]
};

WK2TABLES['Tehtävä'] = {
    schema: "tunnus integer, nimi text, kuvaus text",
    data: [
	[1, "Fotari", "-"],
	[2, "Onko tässä rekursio?", "-"],
	[3, "Keksi tehtävä", "-"],
	[4, "Koetus", "-"]
    ]
};

WK2TABLES['Kurssitehtävä'] = {
    schema: "tehtävä integer, kurssi integer",
    data: [
	[1, 581325],
	[2, 582103],
	[2, 581328],
	[3, 581328],
	[4, 581328]
    ]
};


var WK3TABLES = {};

WK3TABLES['Opiskelija'] = {
    schema: "opiskelijanumero integer, nimi text, syntymävuosi integer, pääaine text",
    data: [
	[999999, "Pihla", 1997, "Tietojenkäsittelytiede"],
	[999998, "Joni", 1993, "Tietojenkäsittelytiede"],
	[999997, "Anna", 1991, "Matematiikka"],
	[999996, "Krista", 1990, "Tietojenkäsittelytiede"],
	[999995, "Matti", 1970, "Matematiikka"],
	[999994, "Gandhi", 1869, "Oikeustiede"],
    ]    
};

WK3TABLES['Kurssi'] = {
    schema: "kurssitunnus integer, nimi text, kuvaus text",
    data: [
	[581325, "Ohjelmoinnin perusteet", "Kurssilla perehdytään nykyaikaisen ohjelmoinnin perusideoihin sekä algoritmien laatimiseen."],
	[582103, "Ohjelmoinnin jatkokurssi", "Kurssilla perehdytään olio-ohjelmoinnin perustekniikoihin."],
	[581328, "Tietokantojen perusteet", "Kurssilla tutustutaan tiedon esitysmuotoihin ja tiedon hakuun suurista tietomääristä."],
	[581999, "Tietokantojen perusteet, osa2", "Tutustutaan LEFT JOIN -komentoon, jonka avulla saadaan esille myös FROM ehtoa seuraavasta taulusta rivejä, joihin LEFT JOIN komennon ON ehto ei osu."]

    ]
};

WK3TABLES['Kurssisuoritus'] = {
    schema: "opiskelija integer, kurssi integer, päivämäärä date, arvosana integer, opintopistemäärä integer",
    data: [
	[999999, 581325, "2014-08-01", 5, 5],
	[999999, 582103, "2014-08-01", 5, 5],
	[999999, 581328, "2014-10-20", 3, 5],
	[999998, 581325, "2013-08-01", 4, 5]
    ]
};

WK3TABLES['Tehtävä'] = {
    schema: "tunnus integer, nimi text, kuvaus text",
    data: [
	[1, "Fotari", "-"],
	[2, "Onko tässä rekursio?", "-"],
	[3, "Keksi tehtävä", "-"],
	[4, "Koetus", "-"]
    ]
};

WK3TABLES['Kurssitehtävä'] = {
    schema: "tunnus integer, tehtävä integer, kurssi integer",
    data: [
	[1001, 1, 581325],
	[1002, 2, 582103],
	[1003, 2, 581328],
	[1004, 3, 581328],
	[1005, 4, 581328]
    ]
};

WK3TABLES['Tehtäväsuoritus'] = {
    schema: "opiskelija integer, tehtävä integer, suoritusaika date",
    data: [
	[999999, 1001, "2014-07-22"],
	[999999, 1002, "2014-07-24"],
	[999999, 1003, "2013-09-14"],
	[999999, 1004, "2014-10-11"],
	[999998, 1001, "2013-07-21"],
	[999998, 1002, "2013-09-14"],
	[999997, 1001, "2014-06-15"],
	[999997, 1004, "2014-06-23"],
	[999995, 1004, "1987-04-01"],
	[999995, 1002, "1987-04-01"],
	[999994, 1004, "1880-01-01"]
    ]
};


var NOTABLES = {};


/*
TABLES['students'] = {
  schema: "name, age, address, city, studentnumber",
  data: [
      ["Eero", 3, "Haaga", "Helsinki", "12321"],
      ["Matti", 43,"Malmi", "Helsinki", "12345"],
      ["Arto", 31, "Tapiola", "Espoo", "12431"],
      ["Pekka", 19, "Eira", "Helsinki", "11221"],
      ["Joni", 22, "Kontula", "Helsinki", "11111"],
      ["Jarmo", 23, "Korso", "Vantaa", "11112"]
  ]
}

TABLES['courses'] = {
  schema: "name, credits, id",
  data: [
      ["OhPe", 5, 1],
      ["TiKaPe", 5, 2],
      ["TiRa", 10, 3],
      ["JTKT", 8, 4]
  ]
}

TABLES['participations'] = {
  schema: "id, course_id, studentnumber, grade",
  data: [
      [1, 1, "11111", 5],
      [2, 3, "11111", 3],
      [3, 1, "12431", 1],
      [4, 2, "12431", 0],
      [5, 3, "12345", 5],
      [6, 1, "12345", 4],
      [7, 1, "11112", 5],
      [8, 4, "11111", 3],
      [9, 4, "12345", 0]
  ]
}
*/