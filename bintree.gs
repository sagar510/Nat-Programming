ctype Tree where
        Node:Int->Tree->Tree->Tree
        ET:Tree

--Q1: For finding Top Element
givetop.(Node.x.ET.ET)=x
givetop.(Node.x.y.z)=x

--Q2: For finding max of all nodes
tmax.(Node.x.ET.ET)=x
tmax.(Node.x.left.ET)=max.x.(tmax.left)
tmax.(Node.x.ET.right)=max.x.(tmax.right)
tmax.(Node.x.left.right)=max.x.(max.(tmax.left).(tmax.right))

--Q3: Layer no. having highest no. of elements

--Q4: Sum of all nodes
tsum.(Node.x.ET.ET)=x
tsum.(Node.x.left.ET)=x+tsum.left
tsum.(Node.x.ET.right)=x+tsum.right
tsum.(Node.x.left.right)=x+tsum.left+tsum.right

--Q5: Convert Data Structure in Sir DataStructure
conv.(Node.x.ET.ET)=[("",x)]
conv.(Node.x.left.ET)=[("",x)]++insertL.(conv.left)
conv.(Node.x.ET.right)=[("",x)]++insertR.(conv.right)
conv.(Node.x.left.right)=[("",x)]++insertL.(conv.left)++insertR.(conv.right)

--Q6: Print List Greater than particular number
isgreater.(Node.x.ET.ET).k=check.x.k
isgreater.(Node.x.left.ET).k=(check.x.k)++(isgreater.left.k)
isgreater.(Node.x.ET.right).k=check.x.k++isgreater.right.k
isgreater.(Node.x.left.right).k=check.x.k++(isgreater.left.k++isgreater.right.k)

check.n.k=if n>k then [n] else []

--Q7: List of all Leaf node
leafli.(Node.x.ET.ET)=[x]
leafli.(Node.x.left.ET)=leafli.left
leafli.(Node.x.ET.right)=leafli.right
leafli.(Node.x.left.right)=leafli.left++leafli.right

--Q8: Reverse of Tree
rev.(Node.x.ET.ET)=Node.x.ET.ET
rev.(Node.x.left.ET)=Node.x.ET.(rev.left)
rev.(Node.x.ET.right)=Node.x.(rev.right).ET
rev.(Node.x.left.right)=Node.x.(rev.right).(rev.left)