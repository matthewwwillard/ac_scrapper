import {Scrapper} from "./Scrapper";

const scrapper = new Scrapper();

const p = new Promise((
    async (resolve, reject) => {

        try
        {
            await scrapper.CollectFish();
            await scrapper.CollectBug();
            await scrapper.CollectFossils();
            await scrapper.CollectDIYs();
            await scrapper.CollectVillagers();
        }
        catch (e) {
            reject(e);
        }

    })
)
    .then(()=>{console.log('Completed')})
    .catch((err)=>{console.error(err)});
