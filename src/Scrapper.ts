import * as request from 'request-promise-native';
import * as cheerio from 'cheerio';
import * as fse from 'fs-extra';

export class Scrapper
{
    private urls = {
        // # Urls for New Horizons
        // # Collectables
            "fish": "https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)",
            "bugs": "https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)",
            "fossils": "https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)",

        // # DIY Recipes
            "tools": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Tools",
            "housewares": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Housewares",
            "wall-mounted": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wall-mounted",
            "wallpaper-rugs-flooring": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Wallpaper,_rugs_and_flooring",
            "equipment": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Equipment",
            "other": "https://animalcrossing.fandom.com/wiki/DIY_recipes/Other",

        // Villagers
            "villagers":"https://animalcrossing.fandom.com/wiki/Villager_list_(New_Horizons)"

        // # Urls for New Leaf
        // # "fish": "https://animalcrossing.fandom.com/wiki/Fish_(New_Leaf)",
        // # "bugs": "https://animalcrossing.fandom.com/wiki/Bugs_(New_Leaf)"
    };

    public constructor()
    {

    }

    public async CollectVillagers()
    {
        try {
            console.log('***** Collecting Villagers *****');
            const htmlData = await request(this.urls.villagers);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            personality:this.elementValue($, children[2]).replace(/♀|♂/, '').trim(),
                            species:this.elementValue($, children[3]),
                            birthday:this.elementValue($, children[4]),
                            catchphrase:this.elementValue($, children[5]).replace(/"/g, ''),
                            sex:this.collectSex(this.elementValue($, children[2]))
                        }
                    );

                });

            });

            await this.generateJSONFile('villagers', finalDataArray);

            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    public async CollectFish()
    {
        try {
            console.log('***** Collecting Fish *****');
            const htmlData = await request(this.urls.fish);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{
                const isNorth:boolean = $(elem).parents('div').attr('title').indexOf('North') >= 0;

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[2])),
                            location:this.elementValue($, children[3]),
                            shadowSize:this.elementValue($, children[4]),
                            time:this.elementValue($, children[5]),
                            jan:this.isDataCheckedOff(this.elementValue($, children[6])),
                            feb:this.isDataCheckedOff(this.elementValue($, children[7])),
                            mar:this.isDataCheckedOff(this.elementValue($, children[8])),
                            apr:this.isDataCheckedOff(this.elementValue($, children[9])),
                            may:this.isDataCheckedOff(this.elementValue($, children[10])),
                            jun:this.isDataCheckedOff(this.elementValue($, children[11])),
                            jul:this.isDataCheckedOff(this.elementValue($, children[12])),
                            aug:this.isDataCheckedOff(this.elementValue($, children[13])),
                            sep:this.isDataCheckedOff(this.elementValue($, children[14])),
                            oct:this.isDataCheckedOff(this.elementValue($, children[15])),
                            nov:this.isDataCheckedOff(this.elementValue($, children[16])),
                            dec:this.isDataCheckedOff(this.elementValue($, children[17])),
                            isNorth:isNorth
                        }
                    );

                });

            });

            await this.generateJSONFile('fish', finalDataArray);

            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    public async CollectBug()
    {
        try {
            console.log('***** Collecting Bugs *****');
            const htmlData = await request(this.urls.bugs);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{
                const isNorth:boolean = $(elem).parents('div').attr('title').indexOf('North') >= 0;

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[2])),
                            location:this.elementValue($, children[3]),
                            time:this.elementValue($, children[4]),
                            jan:this.isDataCheckedOff(this.elementValue($, children[5])),
                            feb:this.isDataCheckedOff(this.elementValue($, children[6])),
                            mar:this.isDataCheckedOff(this.elementValue($, children[7])),
                            apr:this.isDataCheckedOff(this.elementValue($, children[8])),
                            may:this.isDataCheckedOff(this.elementValue($, children[9])),
                            jun:this.isDataCheckedOff(this.elementValue($, children[10])),
                            jul:this.isDataCheckedOff(this.elementValue($, children[11])),
                            aug:this.isDataCheckedOff(this.elementValue($, children[12])),
                            sep:this.isDataCheckedOff(this.elementValue($, children[13])),
                            oct:this.isDataCheckedOff(this.elementValue($, children[14])),
                            nov:this.isDataCheckedOff(this.elementValue($, children[15])),
                            dec:this.isDataCheckedOff(this.elementValue($, children[16])),
                            isNorth:isNorth
                        }
                    );

                });

            });

            await this.generateJSONFile('bugs', finalDataArray);

            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    public async CollectFossils()
    {
        try {
            console.log('***** Collecting Fossils *****');
            const htmlData = await request(this.urls.fossils);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    if(children < 3)
                        return;

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[2]).replace('Bells', "").replace(',', '')),
                        }
                    );

                });

            });

            await this.generateJSONFile('fossils', finalDataArray);

            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    public async CollectDIYs()
    {
        try {
            console.log('***** Collecting DIYs *****');

            let finalDataArray = [];

            finalDataArray = finalDataArray.concat(await this._toolsDiy());
            finalDataArray = finalDataArray.concat(await this._housewareDiy());
            finalDataArray = finalDataArray.concat(await this._wallmountedDiy());
            finalDataArray = finalDataArray.concat(await this._wallpaperDiy());
            finalDataArray = finalDataArray.concat(await this._equipmentDiy());
            finalDataArray = finalDataArray.concat(await this._otherDiy());

            await this.generateJSONFile('DIYs', finalDataArray);

            return true;
        }
        catch (e) {
            console.log(e.message);
            return false;
        }
    }

    /**
     * Tool Collectors
     */

    private async _toolsDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting Tool DIYs *****');
            const htmlData = await request(this.urls.tools);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    private async _housewareDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting HouseWare DIYs *****');
            const htmlData = await request(this.urls.housewares);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    private async _wallmountedDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting Wall Mounted DIYs *****');
            const htmlData = await request(this.urls["wall-mounted"]);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    private async _wallpaperDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting Wall Paper DIYs *****');
            const htmlData = await request(this.urls["wallpaper-rugs-flooring"]);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    private async _equipmentDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting Equipment DIYs *****');
            const htmlData = await request(this.urls.equipment);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    private async _otherDiy() : Promise<any[]>
    {
        try {
            console.log('***** Collecting Other DIYs *****');
            const htmlData = await request(this.urls.other);
            const $ = cheerio.load(htmlData);
            let finalDataArray = [];

            $('table.sortable').each((i, elem)=>{

                $(elem).find('tr').each((i,elem)=>{

                    //Skip the first header info
                    if(i == 0)
                        return;

                    let children = $(elem).children();

                    let materialString = $(children[2]).html().trim();

                    materialString = materialString.replace(/<[/a|noscript][^>]*>|<[/img][^>]*>/g, '');

                    finalDataArray.push(
                        {
                            name:this.elementValue($, children[0]),
                            img:$(children[1]).find('a').attr('href'),
                            bellValue:Number(this.elementValue($, children[5]).replace(/<[^>]*>/g, '').replace('(each)', '')),
                            obtain:this.elementValue($,[children[4]]),
                            materials:materialString.split(/<br>/g)
                        }
                    );

                });

            });
            return finalDataArray;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    }

    /**
     * End Tool Collectors
     */

    private elementValue($, elem)
    {
        return $(elem).text().trim()
    }

    private isDataCheckedOff(value)
    {
        return value == "\u2713" || value == "✔";
    }

    private collectSex(value)
    {
        return value.indexOf('♀') >= 0 ? 'F' : 'M';
    }

    private async generateJSONFile(title, data) : Promise<boolean>
    {
        try {
            await fse.outputJson('./output/' + title + '.json', data);
            return true;
        }
        catch (e) {
            console.error(e.message);
            return false;
        }
    }

}
