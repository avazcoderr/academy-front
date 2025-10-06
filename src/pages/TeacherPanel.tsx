import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, BarChart3, Plus, Edit, Eye } from "lucide-react";

export const TeacherPanel = () => {
  const { user, logout } = useAuth();

  const stats = [
    { title: "Мои курсы", value: "8", icon: BookOpen, color: "bg-blue-500" },
    { title: "Студенты", value: "156", icon: Users, color: "bg-green-500" },
    { title: "Завершенные", value: "89", icon: BarChart3, color: "bg-purple-500" }
  ];

  const myCourses = [
    {
      id: 1,
      title: "Python для начинающих",
      students: 45,
      progress: 85,
      status: "active",
      revenue: "₽15,750"
    },
    {
      id: 2,
      title: "Веб-разработка с Django",
      students: 32,
      progress: 60,
      status: "active",
      revenue: "₽22,400"
    },
    {
      id: 3,
      title: "Telegram боты",
      students: 28,
      progress: 95,
      status: "completed",
      revenue: "₽18,200"
    }
  ];

  const recentStudents = [
    { name: "Анна Козлова", course: "Python для начинающих", progress: 75, lastActive: "2 часа назад" },
    { name: "Дмитрий Волков", course: "Django", progress: 60, lastActive: "5 часов назад" },
    { name: "Елена Попова", course: "Telegram боты", progress: 90, lastActive: "1 день назад" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 inset-x-0 z-50 bg-card/10 border-b border-border/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl text-primary">Avaz academy</span>
            </div>
            <Badge>Учитель</Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Добро пожаловать, {user?.name}
            </span>
            <Button variant="outline" onClick={logout}>
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Панель Учителя</h1>
            <p className="text-muted-foreground">Управление курсами и студентами</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Создать курс
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Мои курсы
              </CardTitle>
              <CardDescription>
                Управление вашими курсами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div key={course.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{course.title}</h3>
                      <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                        {course.status === 'active' ? 'Активный' : 'Завершен'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <span>{course.students} студентов</span>
                      <span>{course.revenue}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Просмотр
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        Редактировать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Активные студенты
              </CardTitle>
              <CardDescription>
                Последняя активность студентов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{student.progress}%</p>
                      <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};