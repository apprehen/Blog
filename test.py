# class Student(object):
#   pass

# # 给实例绑定一个属性:
# s = Student()
# s.name = 'megumi'
# print(s.name)
# # 也可以给实例绑定方法
# def set_age(self,age):
#   self.age = age

# from types import MethodType
# # 给实例绑定一个方法
# s.set_age =MethodType(set_age,s)
# # 调用实例方法
# s.set_age(25)
# # 测试结果
# print(s.age)

# class Student(object):
#   __slots__ = ('name', 'age') # 使用tuple定义运行绑定的属性

# s = Student()
# s.name = 'megumi'
# s.age = 18
# s.address = "heart "
class Student():
  # def __init__(self):
  def get_score(self):
    return self._score
  def set_score(self,value):
    if not isinstance(value,int):
      raise ValueError('score must be an integer')
    if value < 0 or value > 100:
      raise ValueError('score must between 0~100')
    self._score = value

s = Student()
s.set_score(60)
s._score = 80
print(s._score)
# print(s.score)











