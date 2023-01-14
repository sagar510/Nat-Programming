ctype SNat where
        Z:SNat
        S:SNat->SNat
        P:SNat->SNat
        Infinity:SNat

--Q1: Add 2 +ve numbers in successive form
natplus.Z.Z=Z
natplus.x.Z=x
natplus.Z.x=x
natplus.(S.x).(S.y)=S.(S.(natplus.x.y))

--Q2: Check Even or Odd
iseven.Z=True
iseven.(S.Z)=False
iseven.(S.(S.x))=iseven.x

--Q3: Mapping Every Integer with Nat
i2n.0=Z
i2n.n=if n>0 then S.(i2n.(n-1)) else P.(i2n.(n+1))

--Q4: Mapping Every Nat with Integer
n2i.Z=0
n2i.(S.x)=(n2i.x)+1      --(Doubt : Why not 1+ then ?)
n2i.(P.x)=(n2i.x)-1

--Q5: Nat Addition of two Integers
natsum.Z.Z=Z
natsum.x.Z=x
natsum.Z.x=x
natsum.(S.x).(S.y)=S.(S.(natsum.x.y))
natsum.(P.x).(P.y)=P.(P.(natsum.x.y))
natsum.(S.x).(P.y)=natsum.x.y
natsum.(P.x).(S.y)=natsum.x.y


--Q6:Home Work : Nat Subtraction of two integers
natsub.Z.Z=Z
natsub.x.Z=x

natsub.Z.(S.Z)=P.Z
natsub.Z.(P.Z)=S.Z
natsub.Z.(S.x)=P.(natsub.Z.x)
natsub.Z.(P.x)=S.(natsub.Z.x)

natsub.(S.x).(S.y)=natsub.x.y
natsub.(P.x).(P.y)=natsub.x.y
natsub.(S.x).(P.y)=natsub.(S.(S.x)).y
natsub.(P.x).(S.y)=natsub.x.(S.(S.y))


--Q7: Multiplication of two integers
natmul.Z.x=Z
natmul.x.Z=Z
natmul.x.(S.y)=natsum.x.(natmul.x.y)
natmul.(S.x).(P.y)=natmul.(P.y).(S.x)
natmul.(P.x).(P.y)=natmul.(natsub.Z.(P.x)).(natsub.Z.(P.y))