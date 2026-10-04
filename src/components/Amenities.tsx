import { 
  Wifi, 
  Waves, 
  Sailboat, 
  Sun, 
  Trees, 
  Flame, 
  Utensils, 
  Snowflake, 
  Heart, 
  Coffee, 
  Car, 
  Sparkles 
} from 'lucide-react';
import content from '../content.json';

export default function Amenities() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#2D5844]" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-[#1F4952]" />;
      case 'Ship':
        return <Sailboat className="w-5 h-5 text-[#1F4952]" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-[#AC6444]" />;
      case 'Trees':
        return <Trees className="w-5 h-5 text-[#2D5844]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#884D34]" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-[#2D5844]" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-[#1F4952]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#884D34]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#884D34]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#2D5844]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#2D5844]" />;
    }
  };

  return (
    <section id="comodidades" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-b border-[#DDD6C6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#884D34] block mb-2">
            {content.amenities.sectionBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#16353B] mb-3">
            {content.amenities.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#5A6862]">
            {content.amenities.sectionDescription}
          </p>
        </div>

        {/* Scannable Grid with clean icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {content.amenities.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DDD6C6] shadow-xs flex flex-col items-center text-center hover:border-[#1F4952]/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#ECE8DD] flex items-center justify-center mb-3">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-serif text-base font-bold text-[#16353B] mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#5A6862] leading-tight">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
