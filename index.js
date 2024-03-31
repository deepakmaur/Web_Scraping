
const express=require("express")
const request=require("request-promise");
const cheerio=require("cheerio");

const app=express();

const port=process.env.port || 8000;
app.use(express.json());

let user_name="thumsh73a";




async function gfg(){
    let packages=[];
    const html=await request.get(`https://auth.geeksforgeeks.org/user/${user_name}/`)

    const $=cheerio.load(html);
    $("body > div.profile_container > div > div.col.s12.m12.l9.xl10.profile_section_col.right-adjust > div.profile_details_section.activity-container-1.section_card").map((index,element)=>{
        const user = $('.profile_name').text().trim();
        const institution = $('.basic_details_data a').text().trim();
        const longestStrek = $('.streakCnt.tooltipped').text().trim();
        const rank = $('.rankNum').text().trim();
        const coddingScore = $('.score_card_value').text().trim();
        const overallScore = coddingScore.slice(0, 3);
        const solvedProblemsCount = coddingScore.slice(3).replace(/_/g, '');
        const totalSubmissions = $('.heatmap_header .numProblems').text().trim();

        
        

        
        const package1={
            user:user,
            institution:institution,
            longestStrek:longestStrek,
            rank:rank,
            coddingScore:coddingScore,
            overallScore:overallScore, 
            solvedProblemsCount:solvedProblemsCount,
            totalSubmissions:totalSubmissions
        }
        packages.push(package1);
    }).get();
    packages.forEach(element=>{
        console.log(element);
    });
}

async function main(){
    gfg();
}

app.get("/",(req,res)=>{
    res.send("Welcome");
})

app.get("/tour",(req,res)=>{
    main();
    console.log("Done")
})

app.listen(port,()=>{
    console.log(`Server is Running ${port}`);
})
