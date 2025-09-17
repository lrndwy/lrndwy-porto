import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg hover:shadow-emerald-500/10">
      <CardHeader>
        <CardTitle className="text-lg">
          {link ? (
            <a href={link} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
              {title}
            </a>
          ) : (
            title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Badge key={t} variant="secondary" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
