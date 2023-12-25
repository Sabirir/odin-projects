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
console.log(crudeInfosIds)
console.log("crude info length:",crudeInfos[1])

// console.log('infos array:',infos)
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
        siteId:vehicleSiteId[i],
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
// console.log('sorted distance array:',sortedDistance1)


// -----  i made a copy because sort() method changes the original array which creates a mess later on
const fullSitesIndexedCopy=fullSitesIndexed.slice()
const sortedDistance=fullSitesIndexedCopy.sort(function(a,b){
    return a.distance() - b.distance()
})


const sortedFirstSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceFirsSite() - b.distanceFirsSite()
})
const sortedSecondSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceSecondSite() - b.distanceSecondSite()
})
const sortedThirdSiteDistance=fullSitesIndexedCopy.slice().sort(function(a,b){
    return a.distanceThirdSite() - b.distanceThirdSite()
})
    // console.log('sorted distance from first collect site:',sortedFirstSiteDistance.map(s=>s.distanceFirsSite()))
    // console.log('sorted distance from second collect site:',sortedSecondSiteDistance.map(s=>s.distanceSecondSite()))
    // console.log('sorted distance from third collect site:',sortedThirdSiteDistance.map(s=>s.distanceThirdSite()))



const ditanceMatrix=function(){
    let mat=[]
    for(let i=0;i<=fullSitesIndexed.length -1;i++){
        for(let j=0;j<=fullSitesIndexed.length -1;j++){
            mat[i][j]=mat[fullSitesIndexed[i]][fullSitesIndexed[j]]
        }
    }
    return mat
}
ditanceMatrix()
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

function test(){
    let visited=[]
    let distance= 0
    let collectedMilk=0
    let i=0
    let j=0
    const fullVehiclesCopy= fullVehicles.slice()
    
    while (visited.length <= 149 ){
        console.log("vehicle 1 max km:",fullVehiclesCopy[1].maxKm)
        console.log('i=',i)
        console.log('j=',j)
        // console.log("last site:",fullSitesIndexed[i].id)
        console.log(`vehicle ${j}capacity:`,fullVehiclesCopy[j].capacity)
        console.log(`vehicle ${j}max km:`,fullVehiclesCopy[j].maxKm)
        console.log('collected milk:',collectedMilk)
        console.log('distance travelled:',distance)
        // 
        // 
        if( vehicleCapacity(fullVehiclesCopy[j],sortedThirdSiteDistance[i]) && vehicleMaxKm(fullVehiclesCopy[j],sortedThirdSiteDistance[i]))
        {
            if(verified(sortedThirdSiteDistance[i])){
                
            collectedMilk+=sortedThirdSiteDistance[i].quantity
            
            
            fullVehiclesCopy[j].capacity -= sortedThirdSiteDistance[i].quantity
            fullVehiclesCopy[j].maxKm -=calculateEucDistance(fullVehiclesCopy[j],sortedThirdSiteDistance[i])
            //  
            sortedThirdSiteDistance[i].isVisited = true
            visited.push(sortedThirdSiteDistance[i])
            console.log(visited.length)
            distance += calculateEucDistance(fullVehiclesCopy[j],sortedThirdSiteDistance[i])
            fullVehiclesCopy[j].X=sortedThirdSiteDistance[i].X
            fullVehiclesCopy[j].Y=sortedThirdSiteDistance[i].Y
            }
            
            else  {i+=1 }
            
        }
        
        else j+=1
        if(sortedThirdSiteDistance[i].id===152) {  fullVehiclesCopy[j].capacity-=sortedThirdSiteDistance[149].quantity;
            fullVehiclesCopy[j].maxKm-= calculateEucDistance(fullVehiclesCopy[j],sortedThirdSiteDistance[149])
            ;visited.push(sortedThirdSiteDistance[149]);collectedMilk+=sortedThirdSiteDistance[149].quantity;
            console.log("terminus",collectedMilk) 
           
            ; return visited }
        // collect(fullVehiclesCopy,sortedFirstSiteDistance)
        // collect(fullVehiclesCopy,sortedSecondSiteDistance)
        // collect(fullVehiclesCopy,sortedThirdSiteDistance)
        
    }
    return visited
    
}

// console.log("last site id :",sortedThirdSiteDistance[149].id)
// const visited=test()
// console.log(visited.map(v=>v.quantity))

// console.log(sortedFirstSiteDistance[149].quantity)
// console.log('distance entre i=34 et le bassin central:', calculateEucDistance(fullSitesIndexed[34],bassinCentral))


// const visitedSites=fullSitesIndexed.filter(site=>site.isVisited === true)
// console.log('visited sites :',visitedSites.map(vs=>`id:${vs.id}, quantity= ${vs.quantity}`))
// console.log('milk collected in this route:',visitedSites.reduce(function(prev,current){
//     return prev + current.quantity
// },0))
// console.log('vehicle capacity:',fullVehicles[4].capacity)
