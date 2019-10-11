function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  
  let fl = 0;
  let bracketsCount = 0;
  let num = 0;
  let strBegin = 0;
  let strEnd = 0;
  let exp = expr.replace(/[' ']/g,'');
  
  for (let i = 0; i < exp.length; i++) {
    exp[i] === '(' ? bracketsCount++ : '';
    exp[i] === '(' ? fl++ : '';
    exp[i] === ')' ? fl-- : ''; 
  };
  
  if ( fl !== 0 ) {
    throw new Error("ExpressionError: Brackets must be paired")
  }; 
  
  while ( bracketsCount > 0 ) {

      for ( let i = 0; i < exp.length; i++ ) {

        if ( exp[i] === ')' ) {

          for ( let j = i; j >= 0; j-- ) {
 
            if ( exp[j] === '(' ) {               
               strBegin = exp.slice(0,j); 
               strEnd = exp.slice(i+1);  
               exp = exp.slice(j+1,i);            
            }
          }
        } 
      }
      
      calc(exp); 
      exp = strBegin + num + strEnd;
      bracketsCount--; 
  };
  
  calc(exp);
  exp = num;

  function calc(exp) {
    let countMultDivis;
    let arrSprAct = ['*','/','+','-']
    let arrN = [];
    let arrAct = [];
    let k = 0;
    let x = 1;
    let flag = 0;    
       
    exp.split('').forEach ( (b,l,n) => {
      
      arrSprAct.forEach ( (a,i,m) => {
      
        if ( b === a ){

          if ( flag ) {
            k = l+1;
            flag = 0;
                        
          } else {            
            arrN.push(+exp.slice(k,l) * x);
            arrAct.push(exp.substr(l,1));        
            k = l+1;
            x = 1;
          }
        }
 
        if ( ( b === a ) && ( n[l+1] === '-') ) {
          flag = 1;
          x = -1;
        }         
      });
    });  
        
    arrN.push(+exp.slice(k) * x); 
    countMultDivis = arrAct.filter( (a) => a === '/' || a === '*' ).length;  
 
    while (countMultDivis > 0) {
  
      for ( let i = 0; i < arrAct.length; i++) {
     
        if ( ( arrAct[i] === '+' ) || (arrAct[i] === '-') ) {
          continue;
        }     
         
        if ( ( arrAct[i] === '/' ) || ( arrAct[i] === '*' ) ){
          
          if ( ( arrN[i+1] === 0 ) && (arrAct[i] === '/' ) ) { 
            throw new Error("TypeError: Division by zero.");  
          }
 
          arrAct[i] === '/' ? num = arrN[i] / arrN[i+1] : num = arrN[i] * arrN[i+1];;          
          act(i);
          countMultDivis--;
          i--;  
        }
      }   
    }; 

    for ( let i = 0; i < arrAct.length; i++) {  
      
      if ( ( arrAct[i] === '+' ) || (arrAct[i] === '-') ) {
      
        arrAct[i] === '+' ? num = arrN[i] + arrN[i+1] : num = arrN[i] - arrN[i+1];             
        act(i); 
        i--;       
      }      
    };
     
    function act(i) {
      arrN[i+1] = num;
      arrN.splice(i,1);
      arrAct.splice(i,1);
    };

    return num;
  };
   
  return exp; 
};

module.exports = {
    expressionCalculator
}