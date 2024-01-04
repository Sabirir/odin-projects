const fs=require('fs')

const myfileContent=fs.readFileSync('AAC-LT-150.txt','utf-8')
// console.log(myfileContent)
const lines=myfileContent.split("\n") // array with every line in the file as element
// console.log(lines)
const reg=/[0-9]/
const infos=lines.filter(line=>line.match(reg))  // infos is an array without strings 

const crudeInfos= infos.map(info=>info.split('|'))
const crudeInfosIds=crudeInfos.map(cr=>Number(cr[0]))
const crudeInfosX=crudeInfos.map(cr=>Number(cr[1]))
const crudeInfosY=crudeInfos.map(cr=>Number(cr[2]))

let FullInfos=[] 
for(let i=0; i<=crudeInfosIds.length -1; i++ ){
    FullInfos.push({
        id:crudeInfosIds[i] ,
        X: crudeInfosX[i],
        Y:  crudeInfosY[i]
    })
}

const bassinCentralTableau=infos[0].split('|') 
const bassinCentral={
    id:Number(bassinCentralTableau[0]),
    X:Number(bassinCentralTableau[1]),
    Y:Number(bassinCentralTableau[2]),

}
// console.log("bassin tableau: ",bassinCentralTableau)

console.log("bassin: ",bassinCentral)
console.log("infos:",infos.length)

let crudeVehicles=[]

for(let i=0 ;i<=20;i++){
     crudeVehicles[i]=infos[i+1]
}
// console.log(crudeVehicles)

let crudeSites=[]                       // les coordonnees crudes des sites de collecte sous forme de string
for(let i=0 ;i<=infos.length;i++){
     crudeSites=infos.slice(22,infos.length)
}
// donnees des sites de collecte
// console.log('crudSites:',crudeSites)
const sites=crudeSites.map(site=>site.split('|'))
// console.log('sites array:',sites)
const ids=sites.map(site=>Number(site[0]))          // les coordoonnees sont des string donc on les transforme vers des reels
const lesX=sites.map(site=>Number(site[1]))
const lesY=sites.map(site=>Number(site[2]))
const quantity=sites.map(site=>Number(site[3]))

// ---------------------------------------------



// ---Les sites de collecte (objets):
const fullSites=[]
for(let i=0;i<=ids.length-1;i++){
    fullSites.push({
        id:ids[i],
        X:lesX[i],
        Y:lesY[i],
        quantity:quantity[i],
        isVisited: false,
       distance(){
        
        return Math.sqrt( (Math.pow((this.X - bassinCentral.X),2)) + (Math.pow((this.Y - bassinCentral.Y),2)))
       },
       distanceFirsSite(){
        return Math.sqrt( (Math.pow((this.X - firstSite.X),2)) + (Math.pow((this.Y - firstSite.Y),2)))
    }   ,
    distanceSecondSite(){
        return Math.sqrt( (Math.pow((this.X - secondSite.X),2)) + (Math.pow((this.Y - secondSite.Y),2)))
    }   ,
    distanceThirdSite(){
        return Math.sqrt( (Math.pow((this.X - thirdSite.X),2)) + (Math.pow((this.Y - thirdSite.Y),2)))
    }   

    })
}

// donnees des vehicules
const vehicles=crudeVehicles.map(veh=>veh.split('|'))
const vehicleSiteId=vehicles.map(veh=>Number(veh[0]))
const vehicleX=vehicles.map(v=>Number(v[1]))
const vehicleY=vehicles.map(v=>Number(v[2]))
const vehicleId=vehicles.map(v=>Number(v[3]))
const capacity=vehicles.map(v=>Number(v[4]))
const maxKm=vehicles.map(v=>Number(v[5]))




//----- les vehicules (objets):
let fullVehicles=[]
for(let i=0;i<=vehicleId.length-1;i++){
    fullVehicles.push({
        id:vehicleSiteId[i],
        vehicleId:vehicleId[i],
        X:vehicleX[i],
        Y:vehicleY[i],
        capacity:capacity[i],
        maxKm:maxKm[i],
        distance(){
        
            return Math.sqrt( (Math.pow((this.X - bassinCentral.X),2)) + (Math.pow((this.Y - bassinCentral.Y),2)))
           }
      
    })
    
    
}
const firstSite={X:23.67,Y:-2.27}
const secondSite={X:-22.12,Y:11.49}
const thirdSite={X:-32.15,Y:17.0}

function customComparator(a,b){
   return a.id - b.id
}


const fullSitesIndexed=fullSites.sort(customComparator)


let distances=[]
for(let i=0;i<=fullSitesIndexed.length-2;i++){
    // console.log(fullSites[i].distance())
distances[i]=fullSitesIndexed[i].distance()
}
const sortedDistance1=distances.sort(function(a,b){
    return a - b
})


// -----  i made a copy because sort() method changes the original array which will create a mess later on
const fullSitesIndexedCopy=fullSitesIndexed.slice()
const sortedDistance=fullSitesIndexedCopy.sort(function(a,b){
    return a.distance() - b.distance()
})

const first_site_vehicles=[]
for(let i=0;i<7;i++){
    first_site_vehicles.push(fullVehicles[i])
}
console.log("before: ",fullVehicles[0].id)
// console.log("first site vehicles:",first_site_vehicles.reduce(function(prev,current){
//     return prev + current.capacity
// },0))
const second_site_vehicles=[]
for(let i=7;i<14;i++){
    second_site_vehicles.push(fullVehicles[i])
}
// console.log("second site vehicles:",second_site_vehicles.map(s=>s.vehicleId))
const third_site_vehicles=[]
for(let i=14;i<21;i++){
    third_site_vehicles.push(fullVehicles[i])
}

const sortedFirstSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceFirsSite() - b.distanceFirsSite()
})
const sortedSecondSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceSecondSite() - b.distanceSecondSite()
})
const sortedThirdSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceThirdSite() - b.distanceThirdSite()
})
    
const vehicleSites=[{vehicleId:FullInfos[4].id, X:FullInfos[4].X, Y:FullInfos[4].Y},{vehicleId:FullInfos[8].id, X:FullInfos[8].X, Y:FullInfos[8].Y},
{vehicleId:FullInfos[15].id, X:FullInfos[15].X, Y:FullInfos[15].Y}]
    
const totalQuantity=fullSitesIndexed.reduce(function(prev,current){ return prev + current.quantity},0)
const totalCapacity=fullVehicles.reduce(function(prev,current){ return prev + current.capacity},0)
console.log('total quantity of milk is :',totalQuantity)
// console.log('total capacity of vehicles is :',fullVehicles[1].capacity)
function calculateEucDistance(obj1,obj2){
    
    return Math.sqrt(Math.pow(obj1.X  - obj2.X,2) + Math.pow(obj1.Y - obj2.Y ,2))
    
    
}
function vehicleCapacity(vehicle,site){
    
    if( (vehicle.capacity - site.quantity) > 0){
        return true
    }

}
// function vehicleCapacity(vehicle, chosenSite) {
//     if ((vehicle.capacity - chosenSite.quantity) > 0) {
//         return true;
//     }
//     return false;
// }
// function vehicleMaxKm(vehicle, chosenSite) {
//     const distance_vehicle_to_site = calculateEucDistance(vehicle, chosenSite);
//     const distance_site_to_basin = calculateEucDistance(chosenSite, bassinCentral);

//     if (vehicle.maxKm - distance_vehicle_to_site > 0) {
//         // If you want to check against the distance to the basin as well, uncomment the following lines:
//         // if (vehicle.maxKm - (distance_site_to_basin + distance_vehicle_to_site) >= 0) {
//         //     return true;
//         // }
//         return true;
//     }
//     return false;
// }
function vehicleMaxKm(vehicle,site){
    const distance_vehicle_to_site= calculateEucDistance(vehicle,site)
    const distance_site_to_basin= calculateEucDistance(site,bassinCentral)
    if( vehicle.maxKm - distance_vehicle_to_site > 0 ){
        // if( vehicle.maxKm - (distance_site_to_basin + distance_vehicle_to_site) > 0){
        //     return true
        // }
        // else return false
        return true
    }
}
function verified(site){
    if(site.isVisited === false){
        return true
    }
    else{ return false }
}
function traceDistance(vehicle){
let distance=0

}
function full(array){
    if (array.length >149){
        return true
    }
    
}
const ditanceMatrix=function(){
    let mat=[]
    for(let i=0;i<=fullSitesIndexed.length -1 ;i++){
        mat[i]=[]
        for(let j=0;j<=fullSitesIndexed.length -1;j++){
            mat[i][j]= calculateEucDistance(fullSitesIndexed[i],fullSitesIndexed[j])
        }
    }
    return mat
}
// const distanceMatorix=ditanceMatrix()


const filtered_full_infos=FullInfos.reduce((accumulator, currentValue)=>{
    if(!accumulator.some(item => item.id === currentValue.id)){
        accumulator.push(currentValue)
    }
    return accumulator
}, [])
console.log("full infos:",filtered_full_infos.map(f=>f.id))
const dist=()=>{
    let mat=[]
    for(let i=0; i<=filtered_full_infos.length -1; i++){
        mat[i]=[]
        for(let j=0;j<=filtered_full_infos.length -1;j++){
            mat[i][j]=calculateEucDistance(filtered_full_infos[i],filtered_full_infos[j])
        }
    } 
    return mat
}
// matorix=dist()
// for(let i=0;i<=filtered_full_infos.length-1;i++){
//     for(let j=0;j<=filtered_full_infos.length-1;j++){
//         console.log(`Distance between site ${filtered_full_infos[i].id} and site ${filtered_full_infos[j].id}: ${matorix[i][j]}`);
    
//     }
// }
// console.log("matorix:",)
const chooseSite=(arr,ele)=>{
    let mat=[]
    let pre_chosen_site
    let pre_copy
    let chosen_site
    let sorted_pre
    for(let x=0;x<=arr.length -1 ; x++){
        mat.push({idCurrentSite:ele.id,distance:calculateEucDistance(ele,arr[x]),idChosen:arr[x].id,
        isVisited:arr[x].isVisited,
        quantity:arr[x].quantity,
        X:arr[x].X,
        Y:arr[x].Y})

    }
    pre_chosen_site=mat.filter(s=>s.isVisited !== true)
     pre_copy=pre_chosen_site.slice()
    sorted_pre=pre_copy.sort((a,b)=>a.distance - b.distance)
    const filtered= sorted_pre.filter(s=>Number(s.distance) !== 0)
    chosen_site=filtered[0]
    return chosen_site
}
// const chosen_site=chooseSite(fullSitesIndexed,fullSitesIndexed[0])
// console.log("chosen site: ",chosen_site)
const vehicles_for_sorting=fullVehicles.slice()
const first_site_vehicles_for_sorting= first_site_vehicles.slice()
const second_site_vehicles_for_sorting= second_site_vehicles.slice()
const third_site_vehicles_for_sorting= third_site_vehicles.slice()

const sorted_first_site_vehicles_by_capacity=first_site_vehicles_for_sorting.sort((a,b)=>b.capacity - a.capacity)
const sorted_second_site_vehicles_by_capacity=second_site_vehicles_for_sorting.sort((a,b)=>b.capacity - a.capacity)
const sorted_third_site_vehicles_by_capacity=third_site_vehicles_for_sorting.sort((a,b)=>b.capacity - a.capacity)
const sorted_sites_concat=sorted_first_site_vehicles_by_capacity.concat(sorted_second_site_vehicles_by_capacity.concat(sorted_third_site_vehicles_by_capacity))
console.log("vehicles sites concatinated : ",sorted_sites_concat.map(s=>s.capacity))
console.log("vehicles sites concatinated : ",sorted_sites_concat.map(s=>s.vehicleId))


const sorted_vehicles_by_capacity=vehicles_for_sorting.sort((a,b)=>b.capacity - a.capacity)
// console.log("non sorted vehicles : ",first_site_vehicles.map(v=>v.capacity))

// console.log("sorted vehicles : ",sorted_first_site_vehicles_by_capacity.map(v=>v.capacity))
function test(){
    const fullVehiclesCopy2=sorted_sites_concat.slice()
    let visited=[]
    let distance= 0
    let collectedMilk=0
    let i=0
    let j=0
    let mat=[]
    
    let pre_chosen_site
    let chosen_sites=[fullVehiclesCopy2[0]]
    
    const fullVehiclesCopy= fullVehicles.slice()
    
    const fullSitesIndexedCopy2=fullSitesIndexed.slice()
    console.log("Initial visited length:", visited.length);
    while (visited.length !== 150){
        // console.log("vehicle 1 max km:",fullVehiclesCopy[1].maxKm)
        console.log('i=',i)
        console.log('j=',j)
        // console.log("last site:",fullSitesIndexed[i].id)
        console.log(`vehicle ${j}capacity:`,fullVehiclesCopy2[j].capacity)
        console.log(`vehicle ${j}max km:`,fullVehiclesCopy2[j].maxKm)
        console.log('collected milk:',collectedMilk)
        console.log('distance travelled:',distance)
        console.log(`vehicle's at the start x=${fullVehiclesCopy2[j].X} y=${fullVehiclesCopy2[j].Y} `)
       
        // 
        // 
        const chosenSite=chooseSite(fullSitesIndexedCopy2,chosen_sites[chosen_sites.length -1])
        // Add a check for chosenSite being defined
        if (!chosenSite) {
            console.error("No valid site chosen.");
            break  // Exit the loop or handle the error appropriately
        }

       
        mat.push(chosenSite)
      
        const indexId=mat[mat.length -1].idChosen -4
        
        // console.log("chosen site(outside):",chosenSite,"chosenId=",chosenSite.idChosen," equiv=",indexId)
        
        if( vehicleCapacity(fullVehiclesCopy2[j],fullSitesIndexedCopy2[indexId]) && vehicleMaxKm(fullVehiclesCopy2[j],fullSitesIndexedCopy2[indexId]))
        {
            
            if(verified(fullSitesIndexedCopy2[indexId] ) ){
               
                if(chosenSite.idCurrentSite===1 && chosenSite.distance>=50 ){
                    chosen_sites.push(fullVehiclesCopy2[7])
                }
                
                if(j===4){
                    chosen_sites.push(fullVehiclesCopy2[5])
                }
                

                console.log("chosen site:",chosenSite,"chosenId=",chosenSite.idChosen," equiv=",indexId)
                console.log("first s vehicles")
            collectedMilk+=fullSitesIndexedCopy2[indexId].quantity
            
            
            fullVehiclesCopy2[j].capacity -=fullSitesIndexedCopy2[indexId].quantity
            fullVehiclesCopy2[j].maxKm -=calculateEucDistance(fullVehiclesCopy2[j],fullSitesIndexedCopy2[indexId])
            //  
            fullSitesIndexedCopy2[indexId].isVisited = true
            visited.push(fullSitesIndexedCopy2[indexId])
            console.log("visited length: ",visited.length)
            distance += calculateEucDistance(fullVehiclesCopy2[j],fullSitesIndexedCopy2[indexId])
            fullVehiclesCopy2[j].X=fullSitesIndexedCopy2[indexId].X
            fullVehiclesCopy2[j].Y=fullSitesIndexedCopy2[indexId].Y
            console.log(`vehicle's x= ${fullVehiclesCopy2[j].X} y= ${fullVehiclesCopy2[j].Y} `)
            
            }
           
        }
        else { j+=1}
       
        if(visited.length===150){
            distance+=calculateEucDistance(fullSitesIndexedCopy2[indexId],bassinCentral)
            mat.push(bassinCentral)
            console.log('collected milk:',collectedMilk)
            console.log('distance travelled:',distance)
            console.log("mat: ", mat.map(s=>s.idChosen))
            console.log("mat[mat.length -1]= ",mat[mat.length -1])
            const mat_to_file=mat.map(s=>s.X).join('\n')
            fs.writeFileSync('path_1_1.txt',mat_to_file)
          

        }
    }
    return mat
}
test()
const chosen=test()
console.log("j14: ",sorted_sites_concat[14])
console.log("path: ",chosen.map(s=>s.id))
// console.log("after: ",fullVehicles[0].id)
// let chosen_sites=[]
// console.log("closest to first vehicle:",chooseSite(fullSitesIndexed,first_site_vehicles[0]))
console.log(" site id :",fullSitesIndexed[146].id)

// closest
const distance_tester=(site)=>{
    let vat=[]
    let vat_copy
    for(let i=0; i<=fullSitesIndexed.length-1;i++){
        vat.push({id:fullSitesIndexed[i].id,distance:calculateEucDistance(site,fullSitesIndexed[i])})
    }
    vat_copy=vat.slice()
    let sorted=vat_copy.sort((a,b)=>a.distance - b.distance)
    return sorted
}
// let site_test=distance_tester(sorted_sites_concat[14])
// console.log("distances from vehicele  :",site_test.map(s=>s.distance))
// console.log("after2: ",firstSite.X)
