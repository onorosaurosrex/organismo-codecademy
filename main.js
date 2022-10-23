// Returns a random DNA base

const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
//database will store generated strand id codes
// so each strand has a unique identifier.
var dataBase =[0];

//new strand sends a random number out of 1000 possible
const newStrand = () => {
  let newStrandCode = 0;
  while (dataBase.includes (newStrandCode)) {
    newStrandCode = Math.floor(Math.random() * 1000);
  }

  dataBase.push(newStrandCode);
  /*console.log (newStrandCode);*/
  return newStrandCode;
}

// the factory creates an object storing id and strand generated,
// having also the method to mutate the object.
// FACTORY FUNCTION
// FACTORY FUNCTION
// FACTORY FUNCTION
// FACTORY FUNCTION

const pAequorFactory = (organism,array) => {
  return {
    specimenNum:organism,
    dna:array,
    mutate() {
      const base=returnRandBase();
      const randomIndex = Math.floor(Math.random() * 15)
        while (this.dna[randomIndex]==base){
          base=returnRandBase();
        }
        this.dna[randomIndex]=base;
        return this.dna;
      },
      // WILL LIKELY TO SURVIVE 
      willLikelySurvive(){
        let count=0;
        for (let a=0;a<this.dna.length;a++){
          if ((this.dna[a]=='C') || (this.dna[a]=="G")){
            count+=1;
            //console.log (count);

          }
        }return count>=(this.dna.length*0.6);
      },
      // GENERATE COMPLEMENT STRAND
      complementStrand(){
        let complement=[];
        for (let i=0;i<this.dna.length;i++){
          switch(this.dna[i]){
            case 'C':
              complement.push("G");
              break;
            case 'G':
              complement.push("C");
              break;
            case "T":
              complement.push("A");
              break;
            case "A":
              complement.push("T");
              break;
          }
      }
      return complement;
    },
      // COMPARE STRAINS
    compare(chain) {
      let counter=0;
      for (let i=0; i<this.dna.length; i++) {
        if (this.dna[i]==chain.dna[i]){
          counter+=1;
        }
      }
      //return `Specimen ${this.specimenNum} and specimen ${chain.specimenNum} have ${(100*counter/chain.dna.length).toFixed(1)}% DNA in common.`;
      return (100*counter/chain.dna.length);
    }
  }
}

// create 30 succesful chains
const evolution = [];
while (evolution.length <30){
  let a = pAequorFactory (newStrand(),mockUpStrand());
  if (a.willLikelySurvive()){
    console.log (a.willLikelySurvive(),a.dna);
    evolution.push(a);
  };

  }
  console.log (evolution.length);

  let f = pAequorFactory (newStrand(),mockUpStrand());
  console.log (f.base,f.dna);
  console.log (f.complementStrand());

const findClosest = (array) => {
  //FIND DE CLOSEST PAIR
  let closest =[];
  for (let i=0;i<array.length-1;i++){
    for (let b=1+i;b<array.length;b++){
      //console.log (closest);
      if (closest.length==0){
        closest=[array[i],array[b],array[i].compare(array[b])];
        //console.log (closest);
      }else if (array[i].compare(array[b])>closest[2]){
        closest=[array[i],array[b],array[i].compare(array[b])];
      }
    }
    return `The closest pair is maid by series: ${closest[0].specimenNum} and ${closest[1].specimenNum}, which share ${closest[2].toFixed(1)}% of genetic material. `;    
  }
}  

console.log (findClosest(evolution));