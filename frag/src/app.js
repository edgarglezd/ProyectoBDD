const csvWriter = require('csv-writer').createObjectCsvWriter;
const csvtojson = require('csvtojson');
const maincsvPath = './csvs/NETFLIX.csv';

const converter = csvtojson()
    .fromFile(maincsvPath)
    .then((jsonObj) => {
        let indice = 0;
        for(i in jsonObj){
            indice+=1;
            const writer = csvWriter({
                path: './csvs/records/pelicula'+indice+'.csv',
                header: [
                    {id: 'id', title: 'indice'},
                    {id: 'nombre_pelicula', title: 'TITLE_NAME'},
                    {id: 'lenguaje', title: 'LANGUAGE'},
                    {id: 'lanzada', title: 'RELEASED'},
                    {id: 'puntuacion', title: 'RATING'},
                    {id: 'imdb', title: 'IMDB'}
                ]
            });
            const data = [
                {
                    id: indice,
                    nombre_pelicula: jsonObj[i].TITLE_NAME,
                    lenguaje: jsonObj[i].LANGUAGE,
                    lanzada: jsonObj[i].RELEASED,
                    puntuacion: jsonObj[i].RATING,
                    imdb: jsonObj[i].IMDB
                }
            ];
            writer.writeRecords(data)
        }
    }).then(() => {
        console.log('All done');
        });
