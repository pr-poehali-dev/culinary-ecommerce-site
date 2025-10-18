import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Шоколадный торт',
    description: 'Нежный шоколадный бисквит с кремом',
    price: 1200,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/1338d9b1-e482-42e9-93a0-facd31ee8042.jpg',
    category: 'Торты'
  },
  {
    id: 2,
    name: 'Французские макаруны',
    description: 'Ассорти из 12 макаронс',
    price: 800,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/3c3592e7-7606-4774-9870-982086eda794.jpg',
    category: 'Десерты'
  },
  {
    id: 3,
    name: 'Круассаны',
    description: 'Свежие хрустящие круассаны',
    price: 150,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/446d1251-0390-4c82-b7ec-2d4c760587ff.jpg',
    category: 'Выпечка'
  },
  {
    id: 4,
    name: 'Наполеон',
    description: 'Классический торт из слоёного теста',
    price: 1400,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/1338d9b1-e482-42e9-93a0-facd31ee8042.jpg',
    category: 'Торты'
  },
  {
    id: 5,
    name: 'Эклеры',
    description: 'Набор из 6 эклеров с разными начинками',
    price: 600,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/3c3592e7-7606-4774-9870-982086eda794.jpg',
    category: 'Десерты'
  },
  {
    id: 6,
    name: 'Чизкейк',
    description: 'Нью-Йорк чизкейк с ягодным соусом',
    price: 950,
    image: 'https://cdn.poehali.dev/projects/a9bc1ce8-8edb-40fb-950d-a038a352e9f0/files/1338d9b1-e482-42e9-93a0-facd31ee8042.jpg',
    category: 'Торты'
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('catalog');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-dancing font-medium text-primary relative inline-block">
                <span className="relative z-10">ELkaramEL</span>
                <div className="absolute -top-3 -left-3 text-6xl opacity-20">❦</div>
                <div className="absolute -bottom-3 -right-3 text-6xl opacity-20">❦</div>
              </h1>
              <p className="text-sm font-serif text-muted-foreground mt-1 tracking-widest">Кондитерская с душой</p>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-coral">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle className="font-playfair text-2xl">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Корзина пока пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 bg-peach/20 p-4 rounded-lg animate-fade-in">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                          <div className="flex-1">
                            <h3 className="font-light font-playfair">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center font-light">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto"
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex justify-between text-lg font-light font-playfair">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <nav className="bg-gradient-to-r from-peach via-pink to-lavender py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {['catalog', 'about', 'reviews', 'promo', 'delivery', 'contacts'].map((section) => {
              const labels: Record<string, string> = {
                catalog: 'Каталог',
                about: 'О нас',
                reviews: 'Отзывы',
                promo: 'Акции',
                delivery: 'Доставка',
                contacts: 'Контакты'
              };
              return (
                <Button
                  key={section}
                  variant={activeSection === section ? 'default' : 'ghost'}
                  onClick={() => setActiveSection(section)}
                  className="font-playfair"
                >
                  {labels[section]}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'catalog' && (
          <section className="animate-fade-in">
            <div className="text-center mb-12 relative">
              <div className="flourish-divider mb-8"></div>
              <h2 className="text-4xl md:text-5xl font-light font-playfair mb-4 decorative-border inline-block px-12">
                Наши кулинарные шедевры
              </h2>
              <p className="text-lg font-serif text-muted-foreground max-w-2xl mx-auto mt-4">
                Свежая выпечка и десерты каждый день
              </p>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="Торты">Торты</TabsTrigger>
                <TabsTrigger value="Десерты">Десерты</TabsTrigger>
                <TabsTrigger value="Выпечка">Выпечка</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-in">
                      <CardHeader className="p-0 relative overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="absolute top-2 right-2 text-4xl text-white/30">❦</div>
                      </CardHeader>
                      <CardContent className="p-6 relative">
                        <Badge className="mb-2 bg-lavender text-foreground font-serif">{product.category}</Badge>
                        <CardTitle className="font-playfair mb-2 text-2xl">{product.name}</CardTitle>
                        <p className="text-sm font-serif text-muted-foreground mb-4">{product.description}</p>
                        <p className="text-2xl font-light text-primary font-playfair">{product.price} ₽</p>
                        <div className="absolute bottom-2 left-2 text-3xl text-primary/10">✦</div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => addToCart(product)}
                          className="w-full"
                          size="lg"
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              {['Торты', 'Десерты', 'Выпечка'].map(category => (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.category === category).map(product => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="p-0 relative overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                          <div className="absolute top-2 right-2 text-4xl text-white/30">❦</div>
                        </CardHeader>
                        <CardContent className="p-6 relative">
                          <Badge className="mb-2 bg-lavender text-foreground font-serif">{product.category}</Badge>
                          <CardTitle className="font-playfair mb-2 text-2xl">{product.name}</CardTitle>
                          <p className="text-sm font-serif text-muted-foreground mb-4">{product.description}</p>
                          <p className="text-2xl font-light text-primary font-playfair">{product.price} ₽</p>
                          <div className="absolute bottom-2 left-2 text-3xl text-primary/10">✦</div>
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => addToCart(product)}
                            className="w-full"
                            size="lg"
                          >
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="flourish-divider mb-8"></div>
            <h2 className="text-4xl font-light font-playfair mb-6 text-center decorative-border inline-block px-12">О нас</h2>
            <Card className="bg-peach/10 relative overflow-hidden">
              <div className="absolute top-4 left-4 text-6xl text-primary/10">❦</div>
              <div className="absolute bottom-4 right-4 text-6xl text-primary/10">❧</div>
              <CardContent className="p-8 space-y-4 text-lg font-serif relative z-10">
                <p>
                  ELkaramEL — это семейная кондитерская с многолетним опытом создания вкусных десертов.
                  Мы используем только натуральные ингредиенты высшего качества.
                </p>
                <p>
                  Каждое изделие создается с любовью и вниманием к деталям. Наша цель — дарить радость
                  через вкус наших кондитерских шедевров.
                </p>
                <div className="flex gap-8 pt-4 flex-wrap justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-medium text-primary font-playfair">10+</div>
                    <div className="text-sm text-muted-foreground">лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-medium text-primary font-playfair">5000+</div>
                    <div className="text-sm text-muted-foreground">довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-medium text-primary font-playfair">50+</div>
                    <div className="text-sm text-muted-foreground">видов десертов</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="max-w-4xl mx-auto animate-fade-in">
            <div className="flourish-divider mb-8"></div>
            <h2 className="text-4xl font-light font-playfair mb-8 text-center decorative-border inline-block px-12">Отзывы клиентов</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { name: 'Анна', text: 'Лучшие торты в городе! Заказываем на все праздники.', rating: 5 },
                { name: 'Михаил', text: 'Круассаны просто невероятные, как во Франции!', rating: 5 },
                { name: 'Елена', text: 'Красиво, вкусно и всегда свежее. Рекомендую!', rating: 5 },
                { name: 'Дмитрий', text: 'Макаруны - это что-то! Такого вкуса не пробовал нигде.', rating: 5 },
              ].map((review, idx) => (
                <Card key={idx} className="bg-pink/10 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-4xl text-primary/10">✦</div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-light">
                        {review.name[0]}
                      </div>
                      <div>
                        <div className="font-light font-playfair">{review.name}</div>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={14} className="fill-coral text-coral" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-serif italic">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'promo' && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="flourish-divider mb-8"></div>
            <h2 className="text-4xl font-light font-playfair mb-8 text-center decorative-border inline-block px-12">Акции и спецпредложения</h2>
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-coral/20 to-pink/20 border-coral">
                <CardContent className="p-8">
                  <Badge className="mb-4 bg-coral text-white">СКИДКА 20%</Badge>
                  <h3 className="text-2xl font-medium font-playfair mb-2">Первый заказ со скидкой!</h3>
                  <p className="text-muted-foreground">
                    Оформите первый заказ и получите скидку 20% на весь ассортимент. Промокод: ПЕРВЫЙ20
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-lavender/20 to-peach/20 border-primary">
                <CardContent className="p-8">
                  <Badge className="mb-4">ПОДАРОК</Badge>
                  <h3 className="text-2xl font-medium font-playfair mb-2">Бесплатная доставка</h3>
                  <p className="text-muted-foreground">
                    При заказе от 2000 ₽ доставка абсолютно бесплатна!
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="flourish-divider mb-8"></div>
            <h2 className="text-4xl font-light font-playfair mb-8 text-center decorative-border inline-block px-12">Доставка и оплата</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair">
                    <Icon name="Truck" size={24} className="text-primary" />
                    Доставка
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• По городу: 200 ₽</p>
                  <p>• Бесплатно от 2000 ₽</p>
                  <p>• Время: 1-2 часа</p>
                  <p>• Самовывоз бесплатно</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                    Оплата
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• Наличными курьеру</p>
                  <p>• Картой курьеру</p>
                  <p>• Онлайн оплата</p>
                  <p>• Перевод на карту</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="max-w-3xl mx-auto animate-fade-in">
            <div className="flourish-divider mb-8"></div>
            <h2 className="text-4xl font-light font-playfair mb-8 text-center decorative-border inline-block px-12">Контакты</h2>
            <Card className="bg-lavender/10">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-light font-playfair mb-1">Адрес</h3>
                    <p className="text-muted-foreground">ул. Кондитерская, д. 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-light font-playfair mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-light font-playfair mb-1">Email</h3>
                    <p className="text-muted-foreground">info@elkaramel.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-light font-playfair mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      <footer className="bg-gradient-to-r from-peach via-pink to-lavender py-12 mt-16 relative overflow-hidden">
        <div className="absolute top-4 left-1/4 text-5xl text-white/20">❦</div>
        <div className="absolute bottom-4 right-1/4 text-5xl text-white/20">❧</div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flourish-divider mb-4"></div>
          <p className="text-3xl font-dancing font-light mb-2 text-primary">ELkaramEL</p>
          <p className="text-sm font-serif text-muted-foreground tracking-widest">Кондитерская с душой</p>
          <p className="text-xs text-muted-foreground mt-4">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;