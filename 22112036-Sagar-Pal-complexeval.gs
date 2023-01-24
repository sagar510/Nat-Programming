ctype Exp where
        Sub : Op->Exp->Exp->Exp
        Val : [Char]->Exp

ctype Op where
        Plus,Minus,Mul,Div,Pow,Mod : Op

sc."/"=Div
sc."*"=Mul
sc."+"=Plus
sc."-"=Minus
sc."^"=Pow
sc."%"=Mod

prec."^"=5
prec."/"=4
prec."*"=3
prec."%"=2
prec."+"=1
prec."-"=1

sndh.(x::y::xs)=y    -- second Head
rem12.(x::y::xs)=xs 
rem1.(x::xs)=xs

-- solves till bracket
taketb.xs.stack1.(s::stack2) = if (s==")") then parser1.xs.stack1.stack2 else taketb.xs.((Sub.(sc.s).(head.stack1).(sndh.stack1))::(rem12.stack1)).stack2

rev.[]=[]
rev.(x::xs)=rev.xs ++ [x]

--String number to Integer
stoi.xs=stoi1.xs.1
stoi1.[].n=0
stoi1.xs.n=((ord.(last.xs)-48)*n) + stoi1.(init.xs).(10*n)

--Integer to string Number
itos.0=[]                            
itos.n=itos.(n/10)++[chr.((mod.n.10)+48)]

-- Make list of Different number with operator
sepnum.xs=sepnum1.xs.[].[]

sepnum1.[].main.temp=if (temp==[]) then main else main++[temp]
sepnum1.(x::xs).main.temp=if (ord.x>=48 && ord.x<=57) then sepnum1.xs.main.(temp++[x]) else if (temp == []) then sepnum1.xs.(main++[[x]]).[] else sepnum1.xs.(main++[temp]++[[x]]).[]


--parser

parser.xs=parser1.(rev.(sepnum.xs)).[].[]
parsersimp.xs=parser2.(rev.(sepnum.xs)).[].[]


parser1.[].x.[]=head.x   -- parser1 for complex eval 
parser1.[].stack1.stack2 = if (head.stack2==")") then parser1.[].stack1.(rem1.stack2) else parser1.[].((Sub.(sc.(head.stack2)).(head.stack1).(sndh.stack1))::rem12.(stack1)).(rem1.stack2)             
parser1.(x::xs).stack1.stack2= if (ord.(head.x)>=48 && ord.(head.x)<=57) then parser1.xs.((Val.x)::stack1).stack2 else if ((x=="(") && (head.stack2)==")") then parser1.xs.stack1.(rem1.stack2) else if (x=="(") then taketb.xs.stack1.stack2 else opcase1.(x::xs).stack1.stack2


parser2.[].x.[]=head.x   -- parser 2 for simple Eval
parser2.[].stack1.stack2 = if (head.stack2==")") then parser2.[].stack1.(rem1.stack2) else parser2.[].((Sub.(sc.(head.stack2)).(head.stack1).(sndh.stack1))::rem12.(stack1)).(rem1.stack2)             
parser2.(x::xs).stack1.stack2= if (ord.(head.x)>=48 && ord.(head.x)<=57) then parser2.xs.((Val.x)::stack1).stack2 else if ((x=="(") && (head.stack2)==")") then parser2.xs.stack1.(rem1.stack2) else if (x=="(") then taketb.xs.stack1.stack2 else parser2.xs.stack1.(x::stack2)




opcase1.(x::xs).stack1.[]=parser1.xs.stack1.[x]     -- Operator Case                                                                                                        
opcase1.(x::xs).stack1.(s::stack2) = if (x==")" || s==")") then parser1.xs.stack1.(x::s::stack2) else if ((prec.x)>=(prec.s)) then parser1.xs.stack1.(x::s::stack2) else parser1.xs.((Sub.(sc.s).(head.stack1).(sndh.stack1))::(rem12.stack1)).(x::stack2)


ctoi : Char -> Int            
ctoi.x = (ord.x) - 48
listToNum : [Int] -> Int                                                                                                                                    
listToNum.[x] = x
listToNum.(x::y::xs) = listToNum.(((10*x)+y)::xs)

strtoint.x=(map.ctoi;listToNum).x
                                                                                                                                                            
complexEvaluator.(Val.x)=strtoint.x
complexEvaluator.(Sub.Plus.x.y)=(+).(complexEvaluator.x).(complexEvaluator.y)
complexEvaluator.(Sub.Minus.x.y)=(-).(complexEvaluator.x).(complexEvaluator.y)
complexEvaluator.(Sub.Mul.x.y)=(*).(complexEvaluator.x).(complexEvaluator.y)
complexEvaluator.(Sub.Div.x.y)=(/).(complexEvaluator.x).(complexEvaluator.y)
complexEvaluator.(Sub.Pow.x.y)=(^).(complexEvaluator.x).(complexEvaluator.y)
complexEvaluator.(Sub.Mod.x.y)=(mod).(complexEvaluator.x).(complexEvaluator.y)

--Evaluate Expression String->Expression->Int                                                                                                               
complexBodmasEval.x=complexEvaluator.(parser.x)
complexEval.x=complexEvaluator.(parsersimp.x)
