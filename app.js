
    (()=>{let moves, totalMoves;
    const luminate= (sectionPos, time)=>{
        setTimeout(() =>{
            document.querySelector('.section[pos="'+sectionPos + '"]').classList.add('active');
            setTimeout(()=>{
                document.querySelector('.section[pos="'+ sectionPos + '"]').classList.remove('active');
            },300);
        },time);     

    }
    const setMoves=(current)=>{
        moves.push(Math.floor(Math.random()*4)+1);
        if(current < totalMoves){
            setMoves(++current);
        }
    }
    const startGame=()=>{
        moves=[];
        totalMoves=2;
        document.querySelector(('#start')).style.display = 'none';
        document.querySelector(('#message')).style.display = 'block';
        sequence();
    }
    const sequence = ()=>{
        moves=[];
        setMoves(1);
        document.querySelector('#message').innerHTML = 'Duvan says';

        for(let i = 0; i< moves.length;i++){
            luminate(moves[i], 600*i);
        }

        setTimeout(()=>{
            document.querySelector('#message').innerHTML = 'Replicate the sequence';
        },600*moves.length);

    }
    const sectionClick = (did)=>{
        let sectionPos = did.target.getAttribute('pos');
        luminate(sectionPos,0);

        if(moves && moves.length){
            if(moves[0]==sectionPos){
                moves.shift();
                if(!moves.length){
                    totalMoves++;
                    setTimeout(()=>{
                        sequence();
                    },1000)
                }
            }
            else{
                document.querySelector('#message').innerHTML='Game Over';
                setTimeout(()=>{
                    document.querySelector('#start').style.display='block';
                    document.querySelector('#message').style.display='none';
                },1000)
            }
        }
    }
    document.querySelector('#start').addEventListener('click',startGame);
    let sections = Array.from(document.getElementsByClassName('section'));
    sections.forEach(section=>{
        section.addEventListener('click',sectionClick);
    });
})();