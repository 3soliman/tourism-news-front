export function isSeoSyncedWithSource(source: string, target: string): boolean {
  const normalizedSource = source.trim();
  const normalizedTarget = target.trim();

  return normalizedTarget === "" || normalizedTarget === normalizedSource;
}

export function maybeSyncOgTitle(
  nextSeoTitle: string,
  currentSeoTitle: string,
  currentOgTitle: string,
): string | undefined {
  const og = currentOgTitle.trim();

  if (!og || og === currentSeoTitle.trim()) {
    return nextSeoTitle;
  }

  return undefined;
}

export function maybeSyncOgDescription(
  nextSeoDescription: string,
  currentSeoDescription: string,
  currentOgDescription: string,
): string | undefined {
  const og = currentOgDescription.trim();

  if (!og || og === currentSeoDescription.trim()) {
    return nextSeoDescription;
  }

  return undefined;
}
