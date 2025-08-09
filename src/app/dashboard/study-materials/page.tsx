import { StudyMaterialList } from '@/components/study-material-list';

export default function StudyMaterialsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold font-headline">Study Materials</h1>
      <p className="text-muted-foreground">
        Visual guides, notes, and resources to help you master key concepts.
      </p>
      <StudyMaterialList />
    </div>
  );
}
