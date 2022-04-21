import path from "path";
import { CodegenContext } from '@graphql-codegen/cli';
import { normalizeInstanceOrArray } from '@graphql-codegen/plugin-helpers';

export async function isGraphQLDocument(
  filePath: string,
  context: CodegenContext
): Promise<boolean> {
  const config = context.getConfig();

  if (!config.documents) return false;

  const normalized = normalizeInstanceOrArray(config.documents);

  const documents = await context.loadDocuments(normalized);

  if (!documents.length) return false;

  const paths = documents.map(({ location = '' }) => location).filter(Boolean);

  if (!paths.length) return false;
  
  const normalizedFilePath = path.normalize(filePath);

  return paths.some(documentPath => path.normalize(documentPath) === normalizedFilePath);
}
