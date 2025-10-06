import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  originalPrice?: string;
  currentPrice: string;
  isFree?: boolean;
  published?: boolean;
}

export const CourseCard = ({ 
  id,
  title, 
  description, 
  image, 
  originalPrice, 
  currentPrice, 
  isFree = false,
  published = true,
}: CourseCardProps) => {
  return (
    <Card className="relative hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-card/40 border-border/30 backdrop-blur hover-scale animate-fade-in">
      {!published && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <span className="text-foreground font-semibold">Tez orada ochiladi</span>
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img 
              src={image} 
              alt={title}
              loading="lazy"
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {originalPrice && !isFree && (
                  <span className="text-price-old line-through text-sm">{originalPrice}</span>
                )}
                <span className={`font-bold text-lg ${isFree ? 'text-success' : 'text-price-new'}`}>
                  {currentPrice}
                </span>
              </div>
              
              {published ? (
                <Button asChild>
                  <Link to={`/course/${id}`} aria-label={`${title} kursi haqida batafsil`}>
                    Sotib olish
                  </Link>
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  Tez orada
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};