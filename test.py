# class Students(object):
#     def __init__(self,name) -> None:
#         self.name = name
#     def __str__(self) -> str:
#         return f'Student object name is: {self.name}'

# a = Students('megumi')  
# print(a)

# class Fib(object):
#     def __init__(self):
#         self.a, self.b = 0, 1 # 初始化两个计数器a，b

#     def __iter__(self):
#         return self # 实例本身就是迭代对象，故返回自己

#     def __next__(self):
#         self.a, self.b = self.b, self.a + self.b # 计算下一个值
#         if self.a > 100000: # 退出循环的条件
#             raise StopIteration()
#         return self.a # 返回下一个值
# for n in Fib():
#     print(n)
class Student(object):
    def __init__(self,name) -> None:
        self.name = name
    def __call__(self):
        print(f"My name is {self.name}")
        
megumi = Student('Megumi')
megumi()







